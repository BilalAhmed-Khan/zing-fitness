import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Util, DataHandler } from '.';
import { bookingDetails, trainerAccept } from '../ducks/booking';
import { getChatCurrentRoomId } from '../ducks/chat';

function fcmPayloadIdentifier(raw) {
  if (!raw || typeof raw !== 'object') {
    return '';
  }
  const id =
    raw.identifier ??
    raw.target_identifier ??
    raw.TargetIdentifier ??
    raw.Identifier;
  return id == null ? '' : String(id).trim();
}

function fcmPayloadReferenceId(raw) {
  if (!raw || typeof raw !== 'object') {
    return '';
  }
  const id =
    raw.reference_id ??
    raw.referenceId ??
    raw.booking_id ??
    raw.bookingId ??
    raw.ref_id;
  return id == null ? '' : String(id).trim();
}

function showRealtimeBookingInvitationModal(bookingPayload) {
  const modalRef = DataHandler.getTraineAlertModal();
  if (modalRef?.show) {
    modalRef.show({ data: bookingPayload });
  }
}

class FirebaseUtils {
  unsubscribe;

  tokenRefreshUnsubscribe;

  getPermission = async () => {
    const authorizationStatus = await messaging().requestPermission(
      Platform.OS === 'ios' ? { provisional: true } : undefined,
    );
    return (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  /** Ensure APNS registration (iOS) before token retrieval — avoids race / empty tokens at login */
  ensureRegisteredForRemoteMessages = async () => {
    try {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }
      return true;
    } catch (e) {
      if (__DEV__) {
        console.warn('[FCM] registerDeviceForRemoteMessages failed:', e?.message ?? e);
      }
      return false;
    }
  };

  getTokenPromise = async () => {
    try {
      await this.ensureRegisteredForRemoteMessages();
      const token = await messaging().getToken();
      const out = typeof token === 'string' ? token.trim() : '';
      if (__DEV__) {
        console.log('[FCM] getToken:', out ? `${out.slice(0, 28)}…` : '(empty)');
      }
      return out;
    } catch (e) {
      if (__DEV__) {
        console.warn('[FCM] getToken failed:', e?.message ?? e);
      }
      return '';
    }
  };

  createChannel = () => {
    PushNotification.channelExists('zingFitness', exists => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: 'zingFitness', // (required)
            channelName: 'default channel', // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }
    });
  };

  setBadge(val = 0) {
    if (Util.isPlatformAndroid()) {
      PushNotification.setApplicationIconBadgeNumber(val);
    } else {
      PushNotificationIOS.setApplicationIconBadgeNumber(val);
    }
  }

  showLocalNotification = (title = '', message, userInfo) =>
    PushNotification.localNotification({
      channelId: 'zingFitness',
      autoCancel: true,
      largeIcon: '',
      vibrate: true,
      vibration: 300,
      priority: 'high',
      ignoreInForeground: false,
      onlyAlertOnce: false,
      title,
      message,
      playSound: true,
      soundName: 'default',
      invokeApp: true,
      userInfo,
    });

  getRoomIdFromPayload = payload => {
    try {
      const payloadObject = JSON.parse(payload);
      const roomId = payloadObject?.rid ?? '';
      return roomId;
    } catch (error) {
      return '';
    }
  };

  handleLocalNotificationChat = (data, notification) => {
    try {
      this.showLocalNotification(notification.title, notification.body, data);
    } catch (error) {
      //return '';
    }
  };

  handleNotification = (notificationData, isNotification = true) => {
    const { data } = notificationData;

    console.log('NOTIFICATION DATA =>', data);

    if (data) {
      Util.onNotificationTap(data);
    }
  };

  registerFCMListener = () => {
    void this.setupFirebaseMessaging();
  };

  setupFirebaseMessaging = async () => {
    await this.ensureRegisteredForRemoteMessages();
    await this.getPermission();

    this.createChannel();

    this.setBadge();

    messaging().onNotificationOpenedApp(remoteMessage => {
      this.handleNotification(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          this.handleNotification(remoteMessage);
        }
      });

    this.tokenRefreshUnsubscribe?.();
    this.tokenRefreshUnsubscribe = messaging().onTokenRefresh(token => {
      if (__DEV__) {
        console.log(
          '[FCM] Token refreshed;',
          typeof token === 'string' ? `${token.slice(0, 28)}…` : token,
        );
      }
      // Backend updates token mainly on login; re-login refreshes associations.
    });

    this.unsubscribe = messaging().onMessage(remoteMessage => {
      const raw = remoteMessage?.data ?? {};
      const identifier = fcmPayloadIdentifier(raw);
      const referenceId = fcmPayloadReferenceId(raw);

      console.log('NOTIFICATION  ===>', remoteMessage?.notification, raw, {
        identifier,
        referenceId,
      });
      const chatRoomID = getChatCurrentRoomId(
        DataHandler.getStore().getState(),
      );
      Util.refreshNotificationData();
      const { dispatch } = DataHandler.getStore();
      const { notification } = remoteMessage ?? {};

      if (identifier === 'real_time_booking' && referenceId) {
        dispatch(
          bookingDetails.request({
            payloadApi: { id: referenceId },
            identifier: referenceId,
            cb: booking => {
              setTimeout(() => {
                showRealtimeBookingInvitationModal(booking);
              }, 500);
            },
          }),
        );
      } else if (
        identifier === 'real_time_booking_accepted' &&
        referenceId
      ) {
        dispatch(
          bookingDetails.request({
            payloadApi: { id: referenceId },
            identifier: referenceId,
            cb: booking => {
              dispatch(trainerAccept({ id: booking?.id }));
            },
          }),
        );
      } else if (fcmPayloadReferenceId(raw) === String(chatRoomID)) {
      } else if (Util.isPlatformAndroid()) {
        this.showLocalNotification(notification?.title, notification?.body, raw);
      }
    });
  };

  configure = () =>
    PushNotification.configure({
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: this.handleNotification, //(...all) => console.log(...all, 'all'),
    });

  unRegisterFCMListener() {
    this.unsubscribe?.();
    this.tokenRefreshUnsubscribe?.();
    this.tokenRefreshUnsubscribe = undefined;
  }

  removeAllNotifications() {
    if (Util.isPlatformAndroid()) {
      PushNotification.removeAllDeliveredNotifications();
      PushNotification.setApplicationIconBadgeNumber(0);
    } else {
      PushNotificationIOS.removeAllDeliveredNotifications();
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
    this.setBadge();
  }
}
export default new FirebaseUtils();

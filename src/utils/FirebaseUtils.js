import { NativeModules, Platform } from 'react-native';
import { syncPushDeviceTokenToBackend } from './syncPushDeviceTokenToBackend';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Util, DataHandler } from '.';
import { BOOKING_STATUS } from '../config/Constants';
import UserUtill from '../dataUtils/UserUtill';
import { getUserData } from '../ducks/auth';
import { getUserRole } from '../ducks/general';
import { bookingDetails, trainerAccept } from '../ducks/booking';
import { getChatCurrentRoomId } from '../ducks/chat';
import {
  FCM_EVENT_NOT_UNKNOWN_BOOKING,
  getExpandedFcmPayload,
  getFcmPayloadIdentifier,
  getFcmPayloadReferenceId,
  matchesRealTimeBookingAccepted,
  matchesRealTimeBookingInvite,
} from './fcmPayload';

let iosFcmPayloadHintLogged = false;

/** Log FCM payloads in one place (RemoteMessage shape from @react-native-firebase/messaging). */
function logFirebaseIncoming(source, remoteMessage) {
  if (!remoteMessage || typeof remoteMessage !== 'object') {
    console.log('[FCM] incoming:', source, remoteMessage);
    return;
  }
  const n = remoteMessage.notification;
  console.log('[FCM] incoming:', source, {
    messageId: remoteMessage.messageId,
    from: remoteMessage.from,
    collapseKey: remoteMessage.collapseKey,
    sentTime: remoteMessage.sentTime,
    ttl: remoteMessage.ttl,
    data: remoteMessage.data,
    notification: n
      ? {
          title: n.title,
          body: n.body,
          android: n.android,
          apple: n.apple,
        }
      : undefined,
  });
}

/** Log whatever `handleNotification` receives (FCM RemoteMessage or PushNotification object). */
function logNotificationPayload(source, notificationData) {
  if (!notificationData || typeof notificationData !== 'object') {
    console.log('[FCM] incoming:', source, notificationData);
    return;
  }
  if (
    notificationData.messageId != null ||
    notificationData.from != null ||
    (notificationData.notification && notificationData.data)
  ) {
    logFirebaseIncoming(source, notificationData);
    return;
  }
  console.log('[FCM] incoming (PushNotification):', source, {
    title: notificationData.title,
    message: notificationData.message,
    data: notificationData.data,
    userInfo: notificationData.userInfo,
    foreground: notificationData.foreground,
  });
}

function showRealtimeBookingInvitationModal(bookingPayload) {
  const modalRef = DataHandler.getTraineAlertModal();
  if (modalRef?.show) {
    modalRef.show({ data: bookingPayload });
  } else {
    console.warn(
      '[FCM] TraineeAlertModal ref missing; cannot show real-time invite.',
    );
  }
}

class FirebaseUtils {
  unsubscribe;

  tokenRefreshUnsubscribe;

  getPermission = async () => {
    const authorizationStatus = await messaging().requestPermission(
      Platform.OS === 'ios' ? { provisional: true } : undefined,
    );
    const ok =
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (Platform.OS === 'ios' && ok) {
      /**
       * RNFB `requestPermission` only calls `requestAuthorization` — it never calls
       * `registerForRemoteNotifications`. On simulator, RNFB also short-circuits
       * `registerDeviceForRemoteMessages`, so FIRMessaging never receives an APNs token unless
       * something triggers registration (I-FCM002022, undeliverable FCM tokens).
       * RNCPushNotificationIOS resolves auth then registers — safe if already authorized (no extra prompt).
       */
      try {
        const RNCP = NativeModules.RNCPushNotificationIOS;
        await RNCP?.requestPermissions?.({
          alert: true,
          badge: true,
          sound: true,
        });
      } catch (e) {
        if (__DEV__) {
          console.warn(
            '[FCM] RNCPushNotificationIOS.requestPermissions failed (AppDelegate still registers):',
            e?.message ?? e,
          );
        }
      }
    }

    return ok;
  };

  /**
   * Android 13+ blocks posting notifications until POST_NOTIFICATIONS is granted.
   * Without this, FCM notification messages never appear in the tray (and locals won't show).
   */
  ensureAndroidPostNotificationsPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }
    if (typeof Platform.Version !== 'number' || Platform.Version < 33) {
      return true;
    }
    try {
      let status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      if (status !== RESULTS.GRANTED) {
        status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      }
      const ok = status === RESULTS.GRANTED;
      if (__DEV__ && !ok) {
        console.warn(
          '[FCM] POST_NOTIFICATIONS denied — enable notifications in system settings for this app.',
        );
      }
      return ok;
    } catch (e) {
      if (__DEV__) {
        console.warn('[FCM] POST_NOTIFICATIONS check failed:', e?.message ?? e);
      }
      return false;
    }
  };

  /**
   * RNFB resolves registerDeviceForRemoteMessages() immediately if the app already
   * `isRegisteredForRemoteNotifications`, but FIRMessaging may not have received the APNs token yet.
   * Calling getToken() in that gap triggers I-FCM002022 and an invalid IOS FCM registration.
   */
  waitUntilIosApnsTokenIsSet = async () => {
    if (Platform.OS !== 'ios') {
      return;
    }
    // Let native `didRegisterForRemoteNotifications` & `setAPNSToken` run after registerForRemoteNotifications.
    await new Promise(r => setTimeout(r, 200));
    const maxMs = 15000;
    const stepMs = 100;
    const started = Date.now();
    while (Date.now() - started < maxMs) {
      const apns = await messaging().getAPNSToken();
      if (apns != null && apns !== '') {
        return;
      }
      await new Promise(r => setTimeout(r, stepMs));
    }
    if (__DEV__) {
      console.warn(
        '[FCM] APNs token still missing after wait — enable Push Notifications capability, rebuild, try a physical device or Xcode-supported simulator push.',
      );
    }
  };

  /** Ensure APNS registration (iOS) before token retrieval — avoids race / empty tokens at login */
  ensureRegisteredForRemoteMessages = async () => {
    try {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
        await this.waitUntilIosApnsTokenIsSet();
      }
      return true;
    } catch (e) {
      if (__DEV__) {
        console.warn(
          '[FCM] registerDeviceForRemoteMessages failed:',
          e?.message ?? e,
        );
      }
      return false;
    }
  };

  getTokenPromise = async () => {
    try {
      if (Platform.OS === 'ios') {
        await this.getPermission();
      }
      await this.ensureRegisteredForRemoteMessages();
      const token = await messaging().getToken();
      const out = typeof token === 'string' ? token.trim() : '';
      if (__DEV__) {
        console.log('[FCM] getToken (full):', out || '(empty)');
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
    logNotificationPayload('handleNotification', notificationData);

    let { data } = notificationData;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        /* keep string */
      }
    }

    console.log('[FCM] handleNotification parsed data =>', data);

    if (data && typeof data === 'object') {
      Util.onNotificationTap(data);
    }
  };

  registerFCMListener = () => {
    this.setupFirebaseMessaging().catch(err => {
      const msg = err?.message ?? String(err);
      console.error('[FCM] setupFirebaseMessaging failed:', msg, err);
    });
  };

  setupFirebaseMessaging = async () => {
    await this.ensureAndroidPostNotificationsPermission();
    // iOS: request notification auth before APNs registration (Apple + RNFB recommended order).
    await this.getPermission();
    await this.ensureRegisteredForRemoteMessages();

    this.createChannel();

    this.setBadge();

    messaging().onNotificationOpenedApp(remoteMessage => {
      logFirebaseIncoming('onNotificationOpenedApp', remoteMessage);
      this.handleNotification(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          logFirebaseIncoming('getInitialNotification', remoteMessage);
          this.handleNotification(remoteMessage);
        }
      })
      .catch(err => {
        console.error(
          '[FCM] getInitialNotification failed:',
          err?.message ?? err,
        );
      });

    this.tokenRefreshUnsubscribe?.();
    this.tokenRefreshUnsubscribe = messaging().onTokenRefresh(
      async newToken => {
        const t = typeof newToken === 'string' ? newToken.trim() : '';
        if (__DEV__) {
          const preview =
            t.length > 28
              ? `${t.slice(0, 14)}…${t.slice(-10)}`
              : t || '(empty)';
          console.log('[FCM] Token refreshed (preview):', preview);
        }
        if (!t) {
          return;
        }
        const platformTag = Platform.OS === 'ios' ? 'ios' : 'android';
        const store = DataHandler.getStore?.();
        const accessToken = store?.getState?.()?.auth?.data?.accessToken ?? '';
        if (!accessToken || !store) {
          return;
        }
        try {
          const ok = await syncPushDeviceTokenToBackend(t, platformTag);
          if (__DEV__) {
            if (ok) {
              console.log(
                '[FCM] deviceToken synced to backend (update-profile).',
              );
            }
          }
        } catch (e) {
          if (__DEV__) {
            console.warn(
              '[FCM] Token refresh backend sync failed (non-fatal):',
              e?.message ?? e,
            );
          }
        }
      },
    );

    this.unsubscribe = messaging().onMessage(remoteMessage => {
      logFirebaseIncoming('onMessage (foreground)', remoteMessage);

      const dataIn = remoteMessage?.data ?? {};
      const raw =
        typeof dataIn === 'object' && dataIn !== null
          ? getExpandedFcmPayload(dataIn)
          : {};
      const identifier = getFcmPayloadIdentifier(raw);
      const referenceId = getFcmPayloadReferenceId(raw);

      console.log('[FCM] onMessage routing:', {
        identifier,
        referenceId,
        inviteMatch: matchesRealTimeBookingInvite(identifier),
        acceptedMatch: matchesRealTimeBookingAccepted(identifier),
      });

      if (__DEV__) {
        console.log('[FCM] onMessage keys:', Object.keys(dataIn ?? {}));
        console.log('[FCM] expanded payload:', raw);
      }

      const state = DataHandler.getStore().getState();
      const chatRoomID = getChatCurrentRoomId(state);
      Util.refreshNotificationData();
      const { dispatch } = DataHandler.getStore();
      const { notification } = remoteMessage ?? {};

      if (matchesRealTimeBookingInvite(identifier) && referenceId) {
        dispatch(
          bookingDetails.request({
            payloadApi: { id: referenceId },
            identifier: referenceId,
            cb: booking => {
              if (__DEV__) {
                console.log(
                  '[FCM] bookingDetails ok for invite; opening modal.',
                  booking?.id,
                );
              }
              setTimeout(() => {
                showRealtimeBookingInvitationModal(booking);
              }, 500);
            },
          }),
        );
      } else if (matchesRealTimeBookingAccepted(identifier) && referenceId) {
        dispatch(
          bookingDetails.request({
            payloadApi: { id: referenceId },
            identifier: referenceId,
            cb: booking => {
              dispatch(trainerAccept({ id: booking?.id }));
            },
          }),
        );
      } else if (getFcmPayloadReferenceId(raw) === String(chatRoomID)) {
      } else if (
        getUserRole(state) &&
        referenceId &&
        getFcmPayloadReferenceId(raw) !== String(chatRoomID) &&
        !FCM_EVENT_NOT_UNKNOWN_BOOKING.has(identifier) &&
        !matchesRealTimeBookingAccepted(identifier) &&
        !matchesRealTimeBookingInvite(identifier)
      ) {
        dispatch(
          bookingDetails.request({
            payloadApi: { id: referenceId },
            identifier: referenceId,
            cb: booking => {
              if (
                booking?.bookingType === 'realTime' &&
                booking?.status === BOOKING_STATUS.PENDING
              ) {
                const me = UserUtill.id(getUserData(state));
                const trainerId = UserUtill.id(booking?.trainer);
                if (!trainerId || String(trainerId) === String(me)) {
                  if (__DEV__) {
                    console.log(
                      '[FCM] Fallback invite modal from booking payload',
                      booking?.id,
                    );
                  }
                  setTimeout(() => {
                    showRealtimeBookingInvitationModal(booking);
                  }, 500);
                }
              }
            },
          }),
        );
      } else if (Util.isPlatformAndroid()) {
        this.showLocalNotification(
          notification?.title,
          notification?.body,
          typeof dataIn === 'object' && dataIn !== null ? dataIn : {},
        );
      } else if (Platform.OS === 'ios') {
        // Foreground: Android always showed a local notification here; iOS had no fallback,
        // so Firebase Console “notification” tests appeared invisible while logs fired.
        const title = notification?.title ?? '';
        const body = notification?.body ?? '';
        if (title || body) {
          this.showLocalNotification(
            title,
            body,
            typeof dataIn === 'object' && dataIn !== null ? dataIn : {},
          );
        }
      }
    });

    /** iOS: run after RNFB Messaging attaches listeners so PushNotification does not replace the Firebase notification delegate first (see RNFB swizzling + UNUserNotificationCenter). Android unchanged. */
    if (Platform.OS === 'ios') {
      this.configurePushNotification();
    }

    if (__DEV__) {
      if (Platform.OS === 'ios' && !iosFcmPayloadHintLogged) {
        iosFcmPayloadHintLogged = true;
        console.log(
          '[FCM] iOS tip: visible system banners usually need FCM `notification` (title/body) or an APNS alert; pure data payloads are silent when app is backgrounded.',
        );
      }
      try {
        const apns = await messaging().getAPNSToken();
        const fcmTok = await messaging().getToken();
        console.log('[FCM] setup complete:', {
          platform: Platform.OS,
          hasApnsToken: !!(
            Platform.OS === 'ios' &&
            typeof apns === 'string' &&
            apns.length > 0
          ),
          hasFcmToken: !!(
            typeof fcmTok === 'string' && fcmTok.trim().length > 0
          ),
        });
      } catch (e) {
        console.warn('[FCM] post-setup token probe failed:', e?.message ?? e);
      }
    }
  };

  configurePushNotification = () =>
    PushNotification.configure({
      onNotification: this.handleNotification,
      requestPermissions: Platform.OS !== 'ios',
    });

  configure = () => {
    if (Platform.OS === 'android') {
      this.configurePushNotification();
    }
  };

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

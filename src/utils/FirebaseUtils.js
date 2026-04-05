import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Util, NavigationService, DataHandler } from '.';
import { bookingDetails, trainerAccept } from '../ducks/booking';
import { getChatCurrentRoomId } from '../ducks/chat';
import { getTrainerSession } from '../ducks/trainer';
// import { getUserData } from '../ducks/auth';

// import { addNotificationCount, requestGetActivities } from "../ducks/activity";
// import DataHandler from "./DataHandler";

class FirebaseUtils {
  unsubscribe;

  getPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    const enabled =
      authorizationStatus !== messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus !== messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  };

  getTokenPromise = async () => {
    return new Promise((resolve, reject) => {
      messaging()
        .getToken()
        .then(token => {
          resolve(token);
        })
        .catch(() => {
          resolve('');
        });
    });
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
    this.getPermission();

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

    this.unsubscribe = messaging().onMessage(({ data, notification }) => {
      console.log('NOTIFICATION  ===>', notification, data);
      const chatRoomID = getChatCurrentRoomId(
        DataHandler.getStore().getState(),
      );
      Util.refreshNotificationData();
      const { dispatch } = DataHandler.getStore();
      if (data.identifier === 'real_time_booking') {
        dispatch(
          bookingDetails.request({
            payloadApi: { id: data?.reference_id },
            identifier: data?.reference_id,
            cb: data => {
              setTimeout(() => {
                DataHandler.getTraineAlertModal().show({ data: data });
              }, 500);
            },
          }),
        );
      } else if (data?.identifier === 'real_time_booking_accepted') {
        dispatch(
          bookingDetails.request({
            payloadApi: { id: data?.reference_id },
            identifier: data?.reference_id,
            cb: data => {
              dispatch(trainerAccept({ id: data?.id }));
            },
          }),
        );
      } else if (data?.reference_id === chatRoomID) {
      } else if (Util.isPlatformAndroid()) {
        this.showLocalNotification(notification.title, notification.body, data);
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

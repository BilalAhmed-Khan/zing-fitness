import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  getExpandedFcmPayload,
  getFcmPayloadIdentifier,
  getFcmPayloadReferenceId,
  matchesRealTimeBookingInvite,
} from './fcmPayload';

function ensureZingFitnessChannel(done) {
  if (Platform.OS !== 'android') {
    done();
    return;
  }
  PushNotification.channelExists('zingFitness', exists => {
    if (exists) {
      done();
      return;
    }
    PushNotification.createChannel(
      {
        channelId: 'zingFitness',
        channelName: 'default channel',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => done(),
    );
  });
}

/**
 * RN headless / background FCM handler (registered from root index.js).
 * When the server sends a data-only realtime invite, foreground JS may not run; show a local
 * notification so the trainer can tap into the same handleNotification → onNotificationTap path.
 */
export async function handleBackgroundRemoteMessage(remoteMessage) {
  if (__DEV__) {
    console.log(
      '[FCM] background handler messageId:',
      remoteMessage?.messageId,
      {
        data: remoteMessage?.data,
        notification: remoteMessage?.notification,
      },
    );
  }

  const dataIn = remoteMessage?.data ?? {};
  const raw =
    typeof dataIn === 'object' && dataIn !== null
      ? getExpandedFcmPayload(dataIn)
      : {};
  const identifier = getFcmPayloadIdentifier(raw);
  const referenceId = getFcmPayloadReferenceId(raw);
  const n = remoteMessage?.notification;
  const hasSystemNotification = !!(n?.title || n?.body);

  if (
    !matchesRealTimeBookingInvite(identifier) ||
    !referenceId ||
    hasSystemNotification
  ) {
    return;
  }

  const userInfo =
    typeof dataIn === 'object' && dataIn !== null ? { ...dataIn } : {};

  await new Promise(resolve => {
    ensureZingFitnessChannel(() => {
      const localConfig = {
        autoCancel: true,
        largeIcon: '',
        vibrate: true,
        vibration: 300,
        priority: 'high',
        ignoreInForeground: false,
        onlyAlertOnce: false,
        title: 'New session request',
        message: 'Tap to view and accept or decline.',
        playSound: true,
        soundName: 'default',
        invokeApp: true,
        userInfo,
      };
      if (Platform.OS === 'android') {
        localConfig.channelId = 'zingFitness';
      }
      PushNotification.localNotification(localConfig);
      resolve();
    });
  });
}

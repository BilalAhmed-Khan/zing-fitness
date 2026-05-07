import { Platform } from 'react-native';
import { call } from 'redux-saga/effects';
import FirebaseUtils from '../../utils/FirebaseUtils';

/**
 * Attaches FCM registration token + platform to auth payloads (login, signup, social login).
 * Backend should persist token per device/platform so iOS and Android do not overwrite each other.
 */
export function* attachAuthPushCredentials(payloadApi) {
  const deviceToken = yield call([
    FirebaseUtils,
    FirebaseUtils.getTokenPromise,
  ]);
  const trimmed = typeof deviceToken === 'string' ? deviceToken.trim() : '';
  payloadApi.deviceToken = trimmed;
  payloadApi.platform = Platform.OS === 'ios' ? 'ios' : 'android';

  if (__DEV__) {
    const preview =
      trimmed.length > 28
        ? `${trimmed.slice(0, 14)}…${trimmed.slice(-10)}`
        : trimmed || '(empty)';
    console.log(
      `[FCM] auth ${Platform.OS} deviceToken (preview, compare with backend):`,
      preview,
    );
  }

  if (Platform.OS === 'ios' && !trimmed) {
    console.warn(
      '[FCM] iOS: empty deviceToken at auth — realtime trainer push invites will not deliver. Allow notifications, use a physical device, confirm Push Notifications capability + APNs in Firebase.',
    );
  }
}

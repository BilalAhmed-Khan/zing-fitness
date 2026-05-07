/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { handleBackgroundRemoteMessage } from './src/utils/handleBackgroundRemoteMessage';

// Must register before AppRegistry (RNFB): completes iOS background / data-message pipeline.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    await handleBackgroundRemoteMessage(remoteMessage);
  } catch (e) {
    if (__DEV__) {
      console.warn('[FCM] background handler error:', e?.message ?? e);
    }
  }
});

AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

// Must register before AppRegistry (RNFB): completes iOS background / data-message pipeline.
messaging().setBackgroundMessageHandler(async () => {});

AppRegistry.registerComponent(appName, () => App);

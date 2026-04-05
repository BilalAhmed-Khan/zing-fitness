import { Text, LogBox } from 'react-native';

import {
  allowTextFontScaling,
  allowIQKeyboardManager,
} from '../config/AppConfig';

import IQKeyboardManager from './IQKeyboardManager';
import Util from './Util';

export default () => {
  // ingnore warning if you want
  if (__DEV__) {
    LogBox.ignoreAllLogs(true);
  }
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // enable toolbar for android
  if (Util.isPlatformIOS()) {
    IQKeyboardManager.enable(allowIQKeyboardManager);
  }

  // Allow/disallow font-scaling in app
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = allowTextFontScaling;
};

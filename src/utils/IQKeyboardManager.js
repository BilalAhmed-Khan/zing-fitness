import KeyboardManager from 'react-native-keyboard-manager';
import { Platform } from 'react-native';

// enable manager , toolbar , toolbar buttons
function enable(enb) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(enb);
    KeyboardManager.setEnableAutoToolbar(enb);
    KeyboardManager.setToolbarPreviousNextButtonEnable(enb);
  }
}

//enable keyboard manager
function enableKeyboardManager(enb) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(enb);
  }
}

// enable toolbar
function enableToolbar(enb) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnableAutoToolbar(enb);
  }
}

// enable toolbar buttons
function enableToolBarButtons(enb) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setToolbarPreviousNextButtonEnable(enb);
  }
}

export default {
  enable,
  enableKeyboardManager,
  enableToolbar,
  enableToolBarButtons,
};

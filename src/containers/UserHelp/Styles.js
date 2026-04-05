import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  multilineTextInputView: {
    height: '155@ms',
  },
  multilineTextInput: {
    height: '155@ms',
    paddingTop: '10@ms',
  },
  buttonStyle: {
    // width: Metrics.width - 32,
    alignSelf: 'center',
    marginHorizontal: Metrics.baseMargin,
  },
  textStyle: {
    fontSize: Fonts.size.size_17,
    fontFamily: Fonts.medium,
    marginVertical: 20,
  },
  webViewStyle: {
    height: '155@ms',
    backgroundColor: Colors.white,
  },
});

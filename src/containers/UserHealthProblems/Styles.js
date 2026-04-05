import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  title: {
    fontSize: '27@ms',
    fontFamily: Fonts.semiBold,
    width: Metrics.getScreenWidthPercentage(70),
    alignSelf: 'center',
    textAlign: 'center',
  },
  textInput: {
    height: '254@ms',
    paddingTop: '10@ms',
  },
  textInputView: {
    height: '254@ms',
  },
});

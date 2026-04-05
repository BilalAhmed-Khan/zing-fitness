import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#979797',
    width: Metrics.getScreenWidthPercentage(75),
    borderRadius: '30@ms',
    padding: '4@ms',
    flexDirection: 'row',
  },
  button: {
    width: '50%',
    padding: '6@ms',
    borderRadius: '30@ms',
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  buttonTitle: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: '14@ms',
    textAlign: 'center',
  },
});

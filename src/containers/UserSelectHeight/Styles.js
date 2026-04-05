import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '27@ms',
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.largeMargin,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '68@ms',
    width: '120@ms',
    marginVertical: Metrics.largeMargin,
  },
  inputView: {
    // width: '72@ms',
    height: '64@ms',
    borderWidth: 1,
    borderColor: Colors.white,
    color: Colors.white,
  },
  input: {
    padding: 0,
    width: '72@ms',
    height: '64@ms',
    borderRadius: '4@ms',
    textAlign: 'center',
    fontSize: '24@ms',
    fontFamily: Fonts.semiBold,
  },

  unit: {
    fontSize: '16@ms',
    fontFamily: Fonts.regular,
    marginLeft: '8@ms',
  },
});

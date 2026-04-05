import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  logo: {
    alignSelf: 'center',
    marginVertical: Metrics.baseMargin,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginVertical: Metrics.smallMargin,
  },
  forgotPassword: {
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
  },
  facebookButton: {
    backgroundColor: Colors.facebook,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: Metrics.largeMargin,
  },
  horizontalLine: {
    width: '42%',
    height: 2,
    backgroundColor: Colors.tertiary,
  },
  orText: {
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
  },
  needAnAccount: {
    fontSize: '13@ms',
    fontFamily: Fonts.light,
    color: Colors.white,
  },
  signUp: {
    fontSize: '14@ms',
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  buttonContainer: {
    marginTop: Metrics.largeMargin,
  },
});

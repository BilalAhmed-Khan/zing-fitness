import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: '27@ms',
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
  subTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
  codeNotReceived: {
    flexDirection: 'row',
  },
  codeNotReceivedDesc: {
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
  resendButton: {
    fontSize: '14@ms',
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
  emailAndChange: {
    flexDirection: 'row',
  },
  email: {
    fontSize: '13@ms',
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
  changeButton: {
    fontSize: '13@ms',
    fontFamily: Fonts.regular,
    color: Colors.primary,
  },
});

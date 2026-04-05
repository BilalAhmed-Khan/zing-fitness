import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '40@ms',
  },
  textContent: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: '18@ms',
    marginVertical: '8@ms',
  },
  description: {
    fontFamily: Fonts.light,
    fontSize: '13@ms',
    textAlign: 'center',
    lineHeight: '25@ms',
  },
  selectionText: {
    fontFamily: Fonts.medium,
    fontSize: '16@ms',
    marginVertical: '8@ms',
  },
  traineButtonStyle: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  userButtonStyle: {
    marginVertical: 30,
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
});

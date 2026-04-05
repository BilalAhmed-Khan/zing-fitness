import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  mainView: {
    marginHorizontal: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '80@ms',
  },
  onlineIcon: {
    position: 'absolute',
    marginLeft: Metrics.megaMargin,
    marginTop: Metrics.megaMargin - 8,
  },
  imageStyle: {
    height: Metrics.ratio(60),
    width: Metrics.ratio(60),
  },
  childView: {
    flexDirection: 'row',
  },
  usernameText: {
    fontFamily: Fonts.regular,
    fontSize: '15@ms',
  },
  textStyle: {
    fontFamily: Fonts.regular,
    color: Colors.grey5,
    letterSpacing: 0.2,
  },
  timeunreadView: {
    alignItems: 'center',
    paddingRight: Metrics.mediumMargin,
    marginTop: Metrics.smallMargin,
  },
  time: {
    fontFamily: Fonts.regular,
    color: Colors.grey2,
    maxWidth: '80@ms',
  },
  unReadCountText: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    // maxWidth: '80@ms',
  },
  unReadCountView: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  unreadmsg: {
    fontFamily: Fonts.medium,
  },
  textView: {
    marginLeft: Metrics.baseMargin,
    maxWidth: '65%',
  },
  unreadView: {
    backgroundColor: Colors.darkPrimary,
    width: '42@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: Metrics.smallMargin,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.mediumMargin - 10,
  },
  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.darkBlack,
  },
});

import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    // paddingBottom: Platform.select({ ios: 70, android: 90 }),
  },
  secMain: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  childContainer: {
    marginVertical: Metrics.mediumMargin,
    marginHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
  },
  ImageView: {
    height: '86@ms',
    width: '96@ms',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  nameUserID: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  username: {
    fontFamily: Fonts.medium,
    fontSize: '20@ms',
  },
  userid: {
    fontFamily: Fonts.regular,
    color: '#c8c8c8',
  },
  imageStyle: {
    height: '80@ms',
    width: '90@ms',
    borderRadius: 8,
  },
  textView: {
    flex: 1,
    paddingLeft: 15,
  },
  rowButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.baseMargin,
  },
  radioStyle: {
    width: 200,
    height: '25@ms',
    padding: 0,
    borderColor: Colors.darkPrimary,
    marginTop: '10@ms',
  },
  radioButoonStyle: {
    padding: 0,
    justifyContent: 'center',
  },
  radioButoonTextStyle: {
    fontSize: '9@ms',
    fontFamily: Fonts.semiBold,
  },
  kingIcon: {
    height: '26@ms',
    width: '31@ms',
  },
  manageMyClassContainer: {
    backgroundColor: Colors.mediumGrey,
    borderRadius: 20,
    height: '38@ms',
    width: Metrics.width / 2 - 21,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editProfileContainer: {
    backgroundColor: Colors.darkPrimary,
    borderRadius: 20,
    height: '38@ms',
    width: Metrics.width / 2 - 21,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editProfileText: {
    fontSize: '12@ms',
    fontFamily: Fonts.semiBold,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  horizontalLine: {
    width: '100%',
    height: 0.7,
    backgroundColor: Colors.tertiary,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Metrics.smallMargin,
  },
  appointmentsText: {
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
  trainersText: {
    fontFamily: Fonts.medium,
    textAlign: 'center',
    color: Colors.grey1,
  },
});

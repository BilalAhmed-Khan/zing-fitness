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
    // paddingBottom: '20%',
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ViewView: {
    backgroundColor: Colors.white,
    width: '39@ms',
    alignItems: 'center',
    height: '18@ms',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: Metrics.smallMargin,
    bottom: 2,
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
  viewText: {
    color: '#3D3D3D',
    fontSize: '9@ms',
  },
  priceText: {
    fontFamily: Fonts.semiBold,
    fontSize: '20@ms',
  },
  date: {
    fontFamily: Fonts.regular,
    color: '#C9C9C9',
    fontSize: '9@ms',
  },
  recText: {
    fontFamily: Fonts.regular,
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiptBox: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    height: '53@ms',
    width: '100%',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    paddingHorizontal: Metrics.smallMargin + 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2d37',
  },

  receiptInnerView: {
    marginVertical: Metrics.smallMargin,
  },
  dateText: {
    color: '#B8B8B8',
    fontFamily: Fonts.regular,
  },
  receiptView: {
    marginHorizontal: Metrics.baseMargin,
    paddingBottom: Metrics.megaMargin,
    marginTop: Metrics.smallMargin,
  },
  transText: {
    fontFamily: Fonts.medium,
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
    fontFamily: Fonts.semiBold,
    fontSize: '20@ms',
  },
  userid: {
    fontFamily: Fonts.regular,
    color: '#c8c8c8',
    fontSize: '12@ms',
  },
  imageStyle: {
    height: '80@ms',
    width: '90@ms',
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    marginLeft: Metrics.baseMargin,
  },
  kingIcon: {
    height: '26@ms',
    width: '31@ms',
    left: Metrics.smallMargin,
  },
  location: {
    fontFamily: Fonts.regular,
    fontSize: '12@ms',
    color: Colors.lightGrey,
  },
  locationView: {
    flexDirection: 'row',
  },
  imageLocation: {
    marginRight: Metrics.smallMargin,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.darkBlack,
  },
  border: {
    borderColor: Colors.darkPrimary,
    borderWidth: 2,
    width: '65@ms',
    height: '65@ms',
    borderRadius: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerView: {
    backgroundColor: Colors.white,
    width: '57@ms',
    height: '57@ms',
    borderRadius: 45,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  count: {
    alignSelf: 'center',
    color: Colors.primary,
    fontSize: '18@ms',
    fontFamily: Fonts.medium,
  },
  bottomText: {
    alignSelf: 'center',
    fontFamily: Fonts.medium,
    fontSize: '11@ms',
    marginTop: Metrics.smallMargin,
  },
  stepView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Metrics.baseMargin,
  },
  earningView: {
    borderColor: '#C7C7C7',
    borderWidth: 1,
    width: '160@ms',
    height: '150@ms',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.ratio(16),
    alignSelf: 'center',
  },
  earningText: {
    color: '#D4D4D4',
    fontFamily: Fonts.medium,
    fontSize: '11@ms',
  },
  price: {
    fontFamily: Fonts.medium,
    fontSize: '30@ms',
    paddingHorizontal: Metrics.ratio(10),
  },
  boxView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boxButton: {
    width: '65%',
    height: '31@ms',
    marginVertical: Metrics.smallMargin,
    backgroundColor: Colors.darkPrimary,
  },
  buttonStyle: {
    width: '102@ms',
    height: '30@ms',
    marginVertical: Metrics.miniMargin,
    // backgroundColor: Colors.darkPrimary,
  },
});

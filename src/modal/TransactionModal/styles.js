/** @format */

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

const ImageContainer = Metrics.screenWidth * 0.32;
const ImageHeight = Metrics.screenWidth * 0.27;

export default StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    // backgroundColor: Colors.transparent,
  },
  mainContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingTop: Metrics.ratio(10),
    // paddingBottom: Metrics.bottomPadding,
    // maxHeight: Metrics.height * 0.55,
    backgroundColor: Colors.transparent,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: Metrics.ratio(110),
    height: Metrics.ratio(60),
    tintColor: Colors.primary,
  },
  dataView: {
    backgroundColor: Colors.white,
    // paddingVertical: 40,
    width: Metrics.width - 40,
    borderWidth: 1,
    borderColor: Colors.greyborder,
    maxHeight: Metrics.height * 0.7,
  },
  transactionView: {
    // alignSelf: 'center',
    paddingVertical: Metrics.ratio(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey6,
  },
  transactionHistoryView: {
    // alignSelf: 'center',
    paddingVertical: Metrics.ratio(15),
    paddingHorizontal: Metrics.ratio(20),
  },
  thankyouText: {
    fontSize: 23,
    fontFamily: Fonts.semiBold,
  },
  titleText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontFamily: Fonts.semiBold,
    marginTop: 10,
    color: Colors.primary,
  },
  desc: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    // marginTop: 10,
    color: Colors.grey1,
  },
  buttonStyle: {
    marginTop: 20,
    marginHorizontal: 40,
    width: '70%',
  },
  dateTime: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    // marginTop: 10,
    color: Colors.grey1,
  },
  headerTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.black,
    marginTop: 15,
  },
  headerAmountTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.primary,
    marginTop: 15,
  },
  subHeaderTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    // marginTop: 10,
    color: Colors.grey1,
  },
  trainerminiName: {
    fontSize: 10,
    fontFamily: Fonts.medium,
    marginTop: 12,
    textAlign: 'center',
  },
  trainerType: {
    color: Colors.grey2,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  trainerActionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    borderTopColor: Colors.grey3,
    borderTopWidth: 1,
    marginTop: Metrics.baseMargin,
  },
  verticalLine: {
    width: 1,
    height: 26,
    backgroundColor: Colors.grey3,
  },
  fullBox: {
    backgroundColor: Colors.tertiary,
    borderRadius: 14,
    height: 51,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    width: '90%',
  },
  fullBox2: {
    // backgroundColor: Colors.tertiary,
    // borderRadius: '14@ms',
    // height: '51@ms',
    alignItems: 'center',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    // paddingLeft: Metrics.baseMargin,
    // paddingRight: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    // width: '90%',
  },
  timeFull: {
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  loactionHeading: {
    fontFamily: Fonts.regular,
    fontSize: 10,
  },
  priceText: {
    fontFamily: Fonts.regular,
    fontSize: 20,
  },
  otherText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.lightGrey,
    // marginBottom: 12,
  },
  descText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.lightGrey,
    marginBottom: 12,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  horizontalLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.grey1,
  },
  tagView: {
    alignSelf: 'flex-start',
    marginVertical: Metrics.miniMargin,
    padding: 6,
    borderRadius: 8,
    backgroundColor: Colors.blue,
  },
  tagViewText: {
    color: Colors.white,
    fontSize: 11,
  },
  countdigitStyle: {
    height: 28,
    width: 26,
  },
  countdigitTxtStyle: {
    color: Colors.white,
    fontSize: Fonts.size.size_20,
  },
});

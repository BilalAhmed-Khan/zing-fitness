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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingTop: Metrics.ratio(10),
    // paddingBottom: Metrics.bottomPadding,
    // maxHeight: Metrics.height * 0.55,
    backgroundColor: Colors.tertiary,
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Metrics.baseMargin,
    // alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: Metrics.ratio(14),
  },
  buttonView: {
    alignSelf: 'flex-end',
    marginRight: Metrics.ratio(12),
    padding: 5,
    // backgroundColor: 'red',
  },
  itemStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    paddingHorizontal: Metrics.ratio(23),
    paddingVertical: Metrics.ratio(11),
    backgroundColor: Colors.tertiary,
    marginRight: 9,
    marginBottom: 20,
  },
  experienceStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    // paddingHorizontal: Metrics.ratio(23),
    // paddingVertical: Metrics.ratio(11),
    backgroundColor: Colors.tertiary,
    marginRight: 9,
    marginBottom: 20,
  },
  itemStyleSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  thankyouText: {
    fontSize: 23,
    fontFamily: Fonts.semiBold,
  },
  mainText: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.semiBold,
    marginBottom: Metrics.ratio(21),
  },
  titeText: {
    fontSize: Fonts.size.size_13,
    fontFamily: Fonts.regular,
    marginBottom: Metrics.ratio(12),
  },
  containerText: {
    fontSize: Fonts.size.size_13,
    fontFamily: Fonts.regular,
  },
  thankyouSubText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    marginTop: 10,
  },
  desc: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    marginTop: 20,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: 20,
    marginHorizontal: 40,
    width: '70%',
  },
  closeModalIcon: {
    width: Metrics.ratio(12),
    height: Metrics.ratio(12),
  },
  button: {
    marginTop: Metrics.baseMargin,
  },
});

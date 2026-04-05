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
  thankyouText: {
    fontSize: 23,
    fontFamily: Fonts.semiBold,
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
});

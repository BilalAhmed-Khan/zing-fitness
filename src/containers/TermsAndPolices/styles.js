/** @format */

import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';
const styles = StyleSheet.create({
  maincontainer: {
    // flex: 1,
    height: Metrics.height,
    paddingTop: 20,
    // paddingHorizontal: 20,
    // backgroundColor: Colors.red,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  viewText: { backgroundColor: Colors.tertiary },
  textStyle: {
    // color: Colors.grey,
    // fontFamily: Fonts.outfit.regular,
    // fontSize: Fonts.size.size_14,
    // lineHeight: 20,
    // paddingBottom: 20,
  },
});

export default styles;

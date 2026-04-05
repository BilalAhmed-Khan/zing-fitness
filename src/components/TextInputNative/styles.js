/** @format */

import { StyleSheet, Platform } from 'react-native';

import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  input: {
    fontSize: Fonts.size.size_14,
    color: Colors.white,
    fontFamily: Fonts.regular,
    // width: Metrics.ratio(48),
    // height: Metrics.ratio(48),
    height: Metrics.ratio(48),
    width: Metrics.width - 80,
    padding: 0,
  },
  // multline: {
  //   paddingBottom: 24,
  // },
  // inputContainer: {
  //   backgroundColor: "red",
  // },
  // errorText: {
  //   fontSize: Fonts.size.size_12,
  //   color: Colors.errorInput,
  //   marginTop: Metrics.ratio(0),
  // },
  // hint: {
  //   marginTop: Metrics.ratio(6),
  // },
  inputViewStyle: {
    // flexDirection: 'row',
    backgroundColor: Colors.tertiary,
    borderRadius: Metrics.ratio(14),
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    height: Metrics.ratio(51),
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
  },
  // title: {
  //   color: Colors.grey,
  //   fontSize: Fonts.size.size_14,
  //   marginTop: Metrics.ratio(25),
  // },
  // arrowStyle: { marginRight: Metrics.ratio(4) },
  // bottomSpace: { marginBottom: Metrics.ratio(8) },
  // topSpace: { marginTop: Metrics.ratio(19) },
  // labelText: {
  //   bottom: Metrics.ratio(0),
  //   fontSize: Fonts.size.size_12,
  // },
  // leftIconStyle: {
  //   width: 49,
  //   height: 49,
  //   borderRadius: 24.5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 10,
  //   marginLeft: 2,
  //   bottom: -5,
  // },
  // inputContaine: {},
  // onFocuslabelText: {
  //   bottom: Metrics.ratio(0),
  //   paddingTop: Metrics.ratio(0),
  //   fontWeight: "600",
  //   textTransform: "uppercase",
  // },
  // textField: {
  //   fontSize: Fonts.size.size_13,
  //   color: Colors.black,
  // },
});

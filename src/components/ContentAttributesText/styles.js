/** @format */

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';
import { Util } from '../../utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(20),
  },
  policyText: {
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.regular,
    color: Colors.lightGrey,
  },
  polictTextPrimary: {
    fontFamily: Fonts.regular,
    top: Util.isPlatformIOS() ? 3 : 5,
    textDecorationLine: 'underline',
  },
  titleStyle: {
    fontSize: Fonts.size.size_18,
    color: Colors.blackShade,
    marginBottom: 10,
    fontFamily: Fonts.semiBold,
  },
  subtext: {
    fontSize: Fonts.size.size_14,
    color: Colors.GREY,
    marginBottom: 10,
    fontFamily: Fonts.medium,
    lineHeight: Metrics.ratio(19),
  },
  subTextLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinLocation: {
    height: Metrics.ratio(12),
    width: Metrics.ratio(11),
    marginRight: Metrics.ratio(6),
    marginTop: 1,
  },
  subTextWithLocationStyles: {
    fontSize: Fonts.size.size_16,
    color: Colors.grey,
    fontFamily: Fonts.regular,
    marginTop: Metrics.ratio(2),
  },
  titleTextWithLocationStyles: {
    fontSize: Fonts.size.size_18,
    color: Colors.black,
    fontFamily: Fonts.bold,
    marginBottom: Metrics.ratio(13),
  },
  tick: {
    width: 20,
    height: 20,
  },
  box: {
    marginRight: 10,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.GREY86868A,
    borderRadius: 3,
  },
  agreementContainer: {
    marginTop: Metrics.ratio(25),
    alignSelf: 'center',
  },
});

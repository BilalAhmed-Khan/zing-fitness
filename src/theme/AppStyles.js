/** @format */

import { StyleSheet, I18nManager } from 'react-native';

import Metrics from './Metrics';
import Colors from './Colors';
import Fonts from './Fonts';
import { Util } from '../utils';

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  containerflex: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  flashMessage: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.white,
    lineHeight: Metrics.ratio(22),
  },
  transformImage: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  alignCenterView: { justifyContent: 'center', alignItems: 'center' },
  flatlistContentContainer: {},
  headerRightContainerStyle: {
    paddingRight: Metrics.ratio(16),
  },

  headerLeftContainerStyle: {
    paddingLeft: Metrics.ratio(16),
  },
  headerTitleStyle: {
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.regular,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  headerSearchIcon: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.06,
  },
  headerBackIcon: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.06,
  },
  headerNotificationIcon: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.05,
  },
  profileHeaderRight: {
    height: 20,
    width: 4,
    marginRight: Metrics.ratio(3),
    padding: 5,
  },
  leftHeaderContainer: {
    // width: Metrics.screenWidth * 0.2,
    // justifyContent: "space-around",
  },
  headerUserAvatarIcon: {
    height: Metrics.screenWidth * 0.08,
    width: Metrics.screenWidth * 0.08,
  },
  buttonViewStyle: {
    height: Metrics.screenWidth * 0.09,
    width: Metrics.screenWidth * 0.09,
    borderWidth: 2,
    marginBottom: Metrics.ratio(5),
    borderColor: Colors.primary,
    borderRadius: (Metrics.screenWidth * 0.09) / 2,
  },
  headerStyle: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    height: Util.isPlatformIOS()
      ? Metrics.screenHeight * 0.11
      : Metrics.screenHeight * 0.092,
  },
  map: {
    flex: 1,
  },
  rowAligned: {
    flexDirection: 'row',
  },
  flexRowAlingItemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

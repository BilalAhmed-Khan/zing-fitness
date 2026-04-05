import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    // borderTopStartRadius: 50,
    // borderTopRightRadius: 50,
    // backgroundColor: Colors.grey1,
    // paddingBottom: Platform.select({ ios: 70, android: 90 }),
  },
  secMain: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  Heading: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
  },
  viewAllText: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    fontSize: '12@ms',
    textDecorationLine: 'underline',
  },
  FeaturedTrainerContainer: {
    paddingRight: Metrics.baseMargin,
  },
  NearbyTrain: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    marginHorizontal: Metrics.baseMargin,
  },
  SearchText: {
    color: Colors.placeholderText,
    fontSize: Fonts.size.size_14,
  },
  SearchView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: '14@ms',
    paddingHorizontal: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: Metrics.largeMargin,
    height: '40@ms',
    width: Metrics.width - 32,
  },
});

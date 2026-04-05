import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics, Fonts } from '../../theme';

export default ScaledSheet.create({
  imageStyle: {
    height: '80@ms',
    width: '85@ms',
    borderRadius: 60,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  ratingText: {
    fontFamily: Fonts.regular,
  },
  horizontalLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.grey1,
  },
  favoriteT: {
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.mediumMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  content: {
    marginHorizontal: Metrics.smallMargin,
    flexDirection: 'row',
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin,
  },
  name: {
    fontFamily: Fonts.medium,
    fontSize: '15@ms',
  },
  type: {
    fontFamily: Fonts.light,
    fontSize: '10@ms',
    color: '#bbbbbb',
    width: Metrics.width * 0.5,
    marginTop: 8,
  },
  location: {
    fontFamily: Fonts.light,
    fontSize: '14@ms',
    color: '#c8c8c8',
    width: Metrics.width * 0.5,
  },
  ratingContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  locationView: {
    flexDirection: 'row',
    marginTop: Metrics.smallMargin,
  },
  imageLocation: {
    marginRight: Metrics.smallMargin,
  },
});

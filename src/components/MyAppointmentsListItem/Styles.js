import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics, Fonts } from '../../theme';

export default ScaledSheet.create({
  imageStyle: {
    height: '100@ms',
    width: '100@ms',
    borderRadius: 17,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  ratingText: {
    fontFamily: Fonts.regular,
    color: Colors.lightGrey,
    fontSize: '12@ms',
  },
  horizontalLine: {
    width: '100%',
    height: 0.3,
    backgroundColor: Colors.grey1,
  },
  favoriteT: {
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.mediumMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  content: {
    marginHorizontal: Metrics.baseMargin,
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Metrics.smallMargin + 4,
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontFamily: Fonts.medium,
    fontSize: '15@ms',
  },
  type: {
    fontFamily: Fonts.regular,
    fontSize: '12@ms',
    color: Colors.lightGrey,
  },
  ratingContainer: {
    marginTop: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    fontFamily: Fonts.light,
    fontSize: '12@ms',
    color: Colors.lightGrey,
  },
  locationView: {
    flexDirection: 'row',
    marginTop: Metrics.smallMargin,
  },
  imageLocation: {
    marginRight: Metrics.smallMargin,
  },
  More: {
    color: Colors.primary,
    fontSize: '12@ms',
  },
  tagView: {
    marginTop: Metrics.smallMargin,
    padding: '6@ms',
    borderRadius: 8,
  },
  tagViewText: {
    color: Colors.white,
    fontSize: '11@ms',
  },
});

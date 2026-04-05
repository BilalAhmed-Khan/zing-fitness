import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics, Fonts } from '../../theme';

export default ScaledSheet.create({
  imageStyle: {
    height: '53@ms',
    width: '53@ms',
  },
  imageViewStyle: {
    height: '56@ms',
    width: '56@ms',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkPrimary,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  row: {
    flexDirection: 'row',
  },
  ratingText: {
    fontFamily: Fonts.medium,
    color: Colors.white,
    fontSize: '20@ms',
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
    // marginHorizontal: Metrics.baseMargin,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    // height: '53@ms',
    width: '100%',
    borderRadius: 10,
    marginVertical: 5,
    // flexDirection: 'row',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin + 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2d37',
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

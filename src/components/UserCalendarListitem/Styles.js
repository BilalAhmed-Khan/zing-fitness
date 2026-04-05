import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics, Fonts } from '../../theme';

export default ScaledSheet.create({
  imageStyle: {
    height: '80@ms',
    width: '85@ms',
    borderRadius: 60,
    marginTop: Metrics.smallMargin,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  nameStar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: Metrics.smallMargin,
  },
  ratingText: {
    fontFamily: Fonts.regular,
  },
  horizontalLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.grey1,
  },
  locationMain: {
    flexDirection: 'row',
    flex: 1,
  },
  favoriteT: {
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.mediumMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  content: {
    marginLeft: Metrics.baseMargin,
    flexDirection: 'row',
  },
  category: {
    fontFamily: Fonts.medium,
    fontSize: '11@ms',
    marginVertical: Metrics.miniMargin,
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: Metrics.smallMargin,
    marginVertical: Metrics.smallMargin,
  },
  name: {
    fontFamily: Fonts.medium,
    fontSize: '15@ms',
  },
  type: {
    fontFamily: Fonts.light,
    fontSize: '11@ms',
    color: '#dfdfdf',
    marginTop: 5,
  },
  location: {
    fontFamily: Fonts.light,
    fontSize: '14@ms',
    color: '#c8c8c8',
    flex: 0.95,
  },
  locationView: {
    paddingTop: 5,
    flexDirection: 'row',
  },
  imageLocation: {
    marginRight: Metrics.smallMargin,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    height: '32@ms',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookText: {
    fontFamily: Fonts.medium,
    fontSize: '11@ms',
  },
  tagView: {
    alignSelf: 'flex-end',
    marginVertical: Metrics.miniMargin,
    padding: '6@ms',
    borderRadius: 8,
  },
  tagViewText: {
    color: Colors.white,
    fontSize: '11@ms',
  },
});

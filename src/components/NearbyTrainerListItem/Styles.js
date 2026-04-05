import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics, Fonts } from '../../theme';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
  },
  imageStyle: {
    height: '90@ms',
    width: '100@ms',
    borderRadius: 10,
    position: 'absolute',
    left: Metrics.baseMargin,
    zIndex: 1,
    top: 12,
  },
  maincontent: {
    backgroundColor: Colors.tertiary,
    // width: '265@ms',
    flex: 1,
    height: '160@ms',
    borderRadius: 7,
    marginLeft: '76@ms',
  },
  ratingText: {
    fontFamily: Fonts.regular,
  },
  content: {
    marginLeft: Metrics.megaMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.mediumMargin,
  },

  trainerN: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    marginHorizontal: Metrics.smallMargin,
  },
  trainerType: {
    fontFamily: Fonts.regular,
    marginHorizontal: Metrics.smallMargin,
    color: Colors.grey1,
  },
  ratingContainer: {
    marginRight: Metrics.smallMargin,
    alignItems: 'center',
  },
  priceButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  price: {
    fontFamily: Fonts.regular,
    fontSize: '14@ms',
    flex: 1,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    height: '32@ms',
    width: '110@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookText: {
    fontFamily: Fonts.semiBold,
  },
});

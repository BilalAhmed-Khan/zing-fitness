import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics, Fonts } from '../../theme';

export default ScaledSheet.create({
  container: {
    // flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    backgroundColor: Colors.tertiary,
    width: '290@ms',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Heading: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    marginHorizontal: Metrics.baseMargin,
  },
  imageStyle: {
    height: '140@ms',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  boxName: {
    fontFamily: Fonts.regular,
    color: Colors.white,
    fontSize: '14@ms',
    flex: 1,
  },
  boxItems: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: Metrics.smallMargin,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
  },
  boxItems2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
  },
  boxItems3: {
    flexDirection: 'row',
    marginHorizontal: Metrics.smallMargin,
  },
  trainingType: {
    fontFamily: Fonts.regular,
    fontSize: '14@ms',
    color: Colors.grey1,
    flex: 1,
  },
  cost: {
    fontFamily: Fonts.regular,
    fontSize: '14@ms',
    color: Colors.white,
    flex: 0.2,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  horizontalLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.grey1,
  },
  mainTime: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
  },
  smallImage: {
    marginHorizontal: Metrics.smallMargin,
    marginTop: 4,
  },
});

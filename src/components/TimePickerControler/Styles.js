import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    height: '51@ms',
    width: Metrics.getScreenWidthPercentage(45),
  },
  title: {
    fontSize: '14@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  text: {
    color: Colors.white,
    fontSize: '21@ms',
    fontFamily: Fonts.regular,
    width: '80%',
  },
  clock: {
    width: '16@ms',
    height: '16@ms',
  },
});

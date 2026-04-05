import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    borderColor: Colors.transparent,
    borderRadius: '14@ms',
    height: '55@ms',
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  dropdownContainer: {
    backgroundColor: Colors.tertiary,
    paddingHorizontal: Metrics.smallMargin,
  },
  text: {
    color: Colors.white,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
  },
  arrowIcon: {
    tintColor: Colors.white,
  },
});

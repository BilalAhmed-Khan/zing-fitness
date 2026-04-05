import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '18@ms',
    borderBottomWidth: 1,
    borderColor: Colors.tertiary,
  },
  title: {
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    marginLeft: Metrics.baseMargin,
  },
});

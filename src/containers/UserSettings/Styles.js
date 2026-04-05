import { ScaledSheet } from 'react-native-size-matters';
import { Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  title: {
    fontSize: '14@ms',
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.baseMargin,
    textTransform: 'uppercase',
  },
});

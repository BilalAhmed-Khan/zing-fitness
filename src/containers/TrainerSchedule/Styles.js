import { ScaledSheet } from 'react-native-size-matters';
import { Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  timeZoneTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  breakTimeTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  button: {
    marginTop: Metrics.baseMargin,
  },
  selectTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

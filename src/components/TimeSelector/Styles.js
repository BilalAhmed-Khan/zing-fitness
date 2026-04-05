import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: Metrics.baseMargin,
  },
  timeItem: {
    borderWidth: 1,
    borderColor: Colors.grey1,
    width: '102@ms',
    paddingVertical: '10@ms',
    borderRadius: '36@ms',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '6@ms',
  },
  time: {
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
  },
});

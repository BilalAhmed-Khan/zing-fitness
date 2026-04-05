import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  paymentMethod: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentMethodItem: {
    width: '161@ms',
    height: '101@ms',
    borderRadius: '8@ms',
    borderWidth: 1,
    borderColor: Colors.grey1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: Metrics.baseMargin,
    paddingVertical: '8@ms',
  },
  name: {
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    color: Colors.white,
    marginTop: Metrics.smallMargin,
  },
  button: {
    width: '8@ms',
    height: '8@ms',
    borderRadius: '4@ms',
    borderColor: Colors.grey4,
    borderWidth: 1,
  },
});

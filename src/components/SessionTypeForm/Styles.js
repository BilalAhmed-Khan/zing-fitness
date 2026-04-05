import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  sessionRateTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
  },
  sessionRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    marginVertical: Metrics.baseMargin,
    borderWidth: 0.3,
    borderColor: Colors.grey1,
  },
  separator: {
    width: 0.5,
    height: 50,
    backgroundColor: Colors.grey1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    flex: 1,
  },
  dollar: {
    fontSize: '25@ms',
    fontFamily: Fonts.regular,
  },
  textInput: {
    width: '50%',
    fontSize: '25@ms',
    fontFamily: Fonts.regular,
    color: Colors.white,
    marginLeft: 4,
  },
  ratePerMin: {
    fontSize: '10@ms',
    fontFamily: Fonts.regular,
    width: '14%',
    textAlign: 'center',
    marginLeft: 10,
  },
  sessionTimeContainer: {
    marginVertical: Metrics.baseMargin,
  },
  sessionTimeTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
  },
  minutesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  minutes: {
    fontSize: '18@ms',
    fontFamily: Fonts.semiBold,
  },
});

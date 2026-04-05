import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    marginVertical: Metrics.baseMargin,
  },
  title: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    width: '60%',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  daySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.largeMargin,
  },
  dayItem: {
    width: '45@ms',
    height: '45@ms',
    borderRadius: '22.5@ms',
    borderColor: Colors.grey5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayItem: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  selectTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

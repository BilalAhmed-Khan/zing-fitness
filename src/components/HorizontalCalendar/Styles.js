import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  calendar: {
    marginVertical: Metrics.baseMargin,
    height: 80,
  },
  dateNumberStyle: {
    color: Colors.white,
  },
  arrowIcon: {
    tintColor: Colors.white,
  },
});

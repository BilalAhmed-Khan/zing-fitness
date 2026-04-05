import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    borderRadius: '14@ms',
    // height: 56,
    marginVertical: Metrics.smallMargin,
  },
  textContainer: {
    backgroundColor: Colors.tertiary,
    alignItems: 'center',
  },
  codeStyle: {
    color: Colors.white,
  },
  textInputStyle: {
    color: Colors.white,
    padding: 0,
  },
  flagButton: {
    width: Metrics.getScreenWidthPercentage(10),
    marginLeft: Metrics.baseMargin,
  },
});

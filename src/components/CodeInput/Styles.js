import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  codeFieldRoot: {
    marginVertical: '20@ms',
    width: Metrics.getScreenWidthPercentage(80),
  },
  cell: {
    width: '55@ms',
    height: '55@ms',
    lineHeight: 50,
    fontSize: 24,
    borderColor: Colors.white,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: '5@ms',
    color: Colors.white,
    // paddingBottom: 0,
    // margin: 0
  },
  focusCell: {
    borderColor: Colors.primary,
  },
});

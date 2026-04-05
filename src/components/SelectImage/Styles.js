import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  // container: {
  //   width: '100@ms',
  //   height: '100@ms',
  //   borderRadius: '50@ms',
  //   borderColor: Colors.primary,
  //   borderWidth: 2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   marginVertical: Metrics.baseMargin,
  // },
  // innerContainer: {
  //   backgroundColor: Colors.white,
  //   width: '90@ms',
  //   height: '90@ms',
  //   borderRadius: '45@ms',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container: {
    width: Metrics.ratio(100),
    height: Metrics.ratio(100),
    borderRadius: Metrics.ratio(50),
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.smallMargin,
  },
  innerContainer: {
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: Metrics.ratio(92),
    height: Metrics.ratio(92),
    borderRadius: Metrics.ratio(92 / 2),
    alignSelf: 'center',
  },
  imagePlaceholdeStyle: {
    alignSelf: 'center',
  },
});

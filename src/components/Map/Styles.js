import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: Metrics.width,
    // height: Metrics.height,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

/** @format */

import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  containerStyle: {
    width: Metrics.ratio(51),
    height: Metrics.ratio(29),
    borderRadius: Metrics.ratio(36.5),
    // padding: Metrics.ratio(2),
  },
  circleStyle: {
    width: Metrics.ratio(26),
    height: Metrics.ratio(26),
    borderRadius: Metrics.ratio(26) / 2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
});

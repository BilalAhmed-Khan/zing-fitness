/** @format */

import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: Metrics.ratio(12),
    color: Colors.errorInput,
    marginLeft: 10,
  },
});

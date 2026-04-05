/** @format */

import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.ratio(15),
  },
  textStyle: {
    fontSize: Fonts.size.size_17,
    fontFamily: Fonts.medium,
  },
});

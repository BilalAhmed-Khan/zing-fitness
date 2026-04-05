// @flow
import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    // top: 0,
    // position: 'absolute',
    alignItems: 'center',
    // justifyContent: 'center',
    width: Metrics.width,
    // height: 11,
    backgroundColor: 'red',
  },
  loadingMessage: {
    marginBottom: Metrics.baseMargin,
  },
  modal: {
    margin: 0,
  },
  text: {
    fontSize: Fonts.size.size_10,
    padding: 2,
  },
});

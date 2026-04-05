// @flow
import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    top: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.width,
    height: Metrics.height,
  },
  loadingMessage: {
    marginBottom: Metrics.baseMargin,
  },
  modal: {
    margin: 0,
  },
});

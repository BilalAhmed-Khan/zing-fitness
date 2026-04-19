import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

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
  markerStack: {
    alignItems: 'center',
    maxWidth: Metrics.width * 0.55,
  },
  markerLabel: {
    marginBottom: Metrics.ratio(4),
    paddingHorizontal: Metrics.ratio(8),
    paddingVertical: Metrics.ratio(5),
    backgroundColor: Colors.white,
    borderRadius: Metrics.ratio(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.greyborder,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 3,
  },
  markerLabelText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.size.size_12,
    color: Colors.secondary,
    textAlign: 'center',
    maxWidth: Metrics.width * 0.5,
  },
  markerPin: {
    width: Metrics.ratio(36),
    height: Metrics.ratio(36),
  },
});

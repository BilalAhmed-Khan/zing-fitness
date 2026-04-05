import { ScaledSheet } from 'react-native-size-matters';
import { Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  containerContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  mapContainer: {
    flex: 1,
  },
  mapContent: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: Metrics.baseMargin,
    justifyContent: 'space-between',
  },
  mapContentInnerContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.baseMargin,
    textTransform: 'uppercase',
  },
  searchInput: {
    marginVertical: 0,
  },
});

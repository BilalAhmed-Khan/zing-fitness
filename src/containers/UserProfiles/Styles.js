import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    paddingBottom: Platform.select({ ios: 70, android: 90 }),
  },
  secMain: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  favoriteT: {
    fontFamily: Fonts.semiBold,
    marginTop: Metrics.mediumMargin,
    marginBottom: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
  },
});

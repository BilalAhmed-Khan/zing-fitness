import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics } from '../../theme';

export default ScaledSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.tertiary,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentChildrenContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: '26@ms',
    borderTopRightRadius: '26@ms',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    overflow: 'hidden',
  },
});

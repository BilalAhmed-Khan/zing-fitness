import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: '32@ms',
    backgroundColor: Colors.tertiary,
    // flex: 1,
  },
  goBack: {
    position: 'absolute',
    left: Metrics.baseMargin,
    padding: 10,
  },
  title: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  notiNum: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: Metrics.smallMargin,
    bottom: Metrics.smallMargin,
  },
  notiNumText: {
    fontSize: '7@ms',
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: Metrics.baseMargin,
  },
  chatIcon: {
    marginHorizontal: Metrics.smallMargin,
  },
});

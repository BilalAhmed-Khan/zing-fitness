import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: '7@ms',
    backgroundColor: Colors.tertiary,
  },
  iconMain: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: Metrics.smallMargin,
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
  title: {
    fontSize: '15@ms',
    fontFamily: Fonts.medium,
    alignSelf: 'center',
  },
});

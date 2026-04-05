import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.smallMargin,
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.grey5,
    borderRadius: '12@ms',
    marginVertical: Metrics.smallMargin,
  },
  selectedContainer: {
    borderColor: Colors.primary,
  },
  imageStyle: {
    width: 56,
    height: 56,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Metrics.baseMargin,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
  },
});

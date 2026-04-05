import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  profileText: {
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.baseMargin,
  },
  mainView: {
    flexDirection: 'row',
    paddingBottom: Metrics.smallMargin,
    alignItems: 'center',
    borderBottomColor: Colors.grey3,
    borderBottomWidth: 0.3,
    marginVertical: Metrics.smallMargin + 5,
  },
  mainText: {
    fontFamily: Fonts.regular,
    marginHorizontal: Metrics.baseMargin,
    marginTop: 6,
    fontSize: '15@ms',
  },
  imageStyle: { width: 25, height: 25, tintColor: Colors.primary },
});

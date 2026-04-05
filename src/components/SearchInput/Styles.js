import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Metrics, Fonts } from '../../theme';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: '14@ms',
    paddingHorizontal: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: Metrics.largeMargin,
    height: '40@ms',
    width: Metrics.width - 32,
  },
  textInput: {
    width: '90%',
    marginLeft: '2@ms',
    // paddingTop: Metrics.baseMargin,
    // height: '50@ms',
    padding: 0,
    paddingBottom: Platform.select({
      ios: 0,
      android: 2,
    }),
    color: Colors.secondary,
    fontFamily: Fonts.regular,
  },
});

import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    // paddingBottom: Platform.select({ ios: 70, android: 90 }),
  },
  secMain: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: Metrics.baseMargin,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: Metrics.smallMargin,
    justifyContent: 'space-evenly',
  },
  buttonStyleS: {
    width: '46%',
  },
  buttonTextStyleS: {
    fontSize: '10@ms',
    fontFamily: Fonts.medium,
  },
  buttonStyleB: {
    width: '46%',
    backgroundColor: Colors.secondary,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  dayView: {
    backgroundColor: Colors.white,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 35,
    flexDirection: 'row',
    paddingVertical: Metrics.miniMargin,
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
    justifyContent: 'space-around',
  },
  dayText: {
    color: '#AAAAAA',
    fontSize: '9@ms',
    paddingRight: Metrics.smallMargin,
    fontFamily: Fonts.regular,
    borderRightColor: Colors.borderGrey,
    borderRightWidth: 1,
  },
});

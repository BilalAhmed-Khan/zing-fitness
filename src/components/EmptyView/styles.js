import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.tertiary,
  },
  image: {
    // marginTop: Platform.select({
    //   android: Metrics.ratio(56),
    //   ios: Metrics.ratio(50),
    // }),
  },
  title: {
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: Fonts.size.size_32,
    fontFamily: Fonts.medium,
    lineHeight: Metrics.ratio(34),
    marginTop: Metrics.ratio(32),
    color: Colors.white,
  },
  text: {
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: Fonts.size.size_15,
    fontFamily: Fonts.regular,
    lineHeight: Metrics.ratio(28),
    marginTop: Metrics.ratio(8),
    color: Colors.white,
  },
});

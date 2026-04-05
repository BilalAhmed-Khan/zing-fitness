import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.tertiary,
  },
  messageView: {
    // height: 50,
    justifyContent: 'center',
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
  },
  timeText: {
    color: Colors.grey2,
    alignSelf: 'flex-end',
    fontSize: Fonts.size.size_13,
    marginVertical: 8,
    // backgroundColor: 'red',
  },
  messageText: {
    color: Colors.white,
    fontSize: Fonts.size.size_15,
    marginBottom: 10,
    // backgroundColor: 'red',
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
  header: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fonts.size.size_16,
    textTransform: 'uppercase',
    paddingTop: Metrics.ratio(30),
    paddingBottom: Metrics.ratio(12),
  },
});

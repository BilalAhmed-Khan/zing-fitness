import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  avatarContainer: {
    width: '92@ms',
    height: '92@ms',
    borderRadius: '46@ms',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.baseMargin,
  },
  avatar: {
    width: '88@ms',
    height: '88@ms',
    borderRadius: '44@ms',
  },
  trainerName: {
    fontSize: '14@ms',
    fontFamily: Fonts.medium,
    alignSelf: 'center',
    marginVertical: Metrics.smallMargin,
  },
  line: {
    width: 1,
    height: '11@ms',
    backgroundColor: Colors.grey3,
    marginHorizontal: Metrics.smallMargin,
  },
  titlesContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: Metrics.smallMargin,
  },
  title: {
    fontSize: '10@ms',
    fontFamily: Fonts.regular,
  },
  dayAndTimeContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: Metrics.smallMargin,
  },
  location: {
    marginLeft: Metrics.smallMargin,
  },
  time: {
    fontSize: '25@ms',
    fontFamily: Fonts.regular,
    alignSelf: 'center',
  },
  label: {
    fontSize: '10@ms',
    fontFamily: Fonts.regular,
    alignSelf: 'center',
    marginVertical: Metrics.smallMargin,
  },
  textInput: {
    backgroundColor: Colors.tertiary,
    borderRadius: '12@ms',
    borderColor: Colors.grey5,
    borderWidth: 1,
    height: '144@ms',
    width: '85%',
    marginVertical: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    color: Colors.white,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '85%',
    marginTop: Metrics.baseMargin,
  },
});

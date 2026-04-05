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
  },
  imageStyle: {
    height: '90@ms',
    width: '100@ms',
    borderRadius: 8,
  },
  childContainer: {
    marginVertical: Metrics.mediumMargin,
    marginHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
  },
  ImageView: {
    height: '96@ms',
    width: '106@ms',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  nameUserID: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: Metrics.baseMargin,
  },
  username: {
    fontFamily: Fonts.medium,
    fontSize: '20@ms',
  },
  userid: {
    fontFamily: Fonts.regular,
    color: '#c8c8c8',
  },
  editProfileContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    height: '38@ms',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editProfileText: {
    fontFamily: Fonts.semiBold,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  horizontalLine: {
    width: '100%',
    height: 0.7,
    backgroundColor: Colors.tertiary,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
  },
  appointmentsText: {
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
  trainersText: {
    fontFamily: Fonts.medium,
    textAlign: 'center',
    color: Colors.grey1,
  },
});

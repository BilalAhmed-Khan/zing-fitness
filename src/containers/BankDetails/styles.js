import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  avatarContainer: {
    width: '92@ms',
    height: '92@ms',
    borderRadius: '46@ms',
    borderWidth: 2,
    borderColor: Colors.primary,
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
  cameraIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '-9@ms',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrics.baseMargin,
  },
  userDetails: {
    width: '30%',
  },
  title: {
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
  },
  textInput: {
    backgroundColor: Colors.tertiary,
    borderRadius: '8@ms',
    height: '100@ms',
    marginVertical: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    color: Colors.white,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
  },
  addCertificateContainer: {
    height: '122@ms',
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey5,
    borderRadius: '14@ms',
    marginVertical: Metrics.baseMargin,
  },
  imageStyle: {
    height: '120@ms',
    width: '100%',
  },
});

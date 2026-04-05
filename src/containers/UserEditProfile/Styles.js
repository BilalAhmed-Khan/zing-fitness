import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  avatarContainer: {
    width: '95@ms',
    height: '95@ms',
    borderRadius: '47.5@ms',
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
    width: '48%',
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
  textInputSmall: {
    color: Colors.white,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    width: '80%',
  },
  textInputView: {
    flexDirection: 'row',
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    height: '51@ms',
  },
});

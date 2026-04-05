import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  trainerIntro: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    alignItems: 'center',
  },
  trainerAvatarContainer: {
    width: '96@ms',
    height: '96@ms',
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: '8@ms',
  },
  trainerAvatar: {
    width: '94@ms',
    height: '94@ms',
  },
  trainerDetails: {
    marginLeft: Metrics.largeMargin,
  },
  trainerName: {
    fontSize: '20@ms',
    fontFamily: Fonts.semiBold,
  },
  trainerSkill: {
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
    color: Colors.grey2,
    marginTop: '3@ms',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: '4@ms',
  },
  location: {
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
    color: Colors.grey2,
    marginLeft: '2@ms',
  },
  appointmentContainer: {
    paddingVertical: Metrics.largeMargin,
  },
  appointmentHeading: {
    fontSize: '14@ms',
    fontFamily: Fonts.semiBold,
    marginBottom: Metrics.smallMargin,
  },
  buton: {
    width: '70%',
    alignSelf: 'center',
    marginVertical: Metrics.baseMargin,
  },
});

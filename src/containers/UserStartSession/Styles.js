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
  trainerCover: {
    width: '100%',
    height: '175@ms',
    borderRadius: '12@ms',
    marginVertical: Metrics.smallMargin,
  },
  detailsContainer: {
    marginVertical: Metrics.baseMargin,
  },
  detailsHeading: {
    fontSize: '14@ms',
    fontFamily: Fonts.medium,
    marginBottom: Metrics.smallMargin,
  },
  details: {
    fontSize: '10@ms',
    fontFamily: Fonts.regular,
    lineHeight: '16@ms',
  },
  equipmentImageContainer: {
    flexDirection: 'row',
  },
  equipmentImage: {
    width: '110@ms',
    height: '83@ms',
    marginRight: Metrics.smallMargin,
  },
});

import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  header: {
    justifyContent: 'space-between',
    paddingVertical: '32@ms',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Metrics.baseMargin,
  },
  avatarCotainer: {
    width: '99@ms',
    height: '99@ms',
    borderRadius: '49.5@ms',
    // borderWidth: 2,
    borderColor: Colors.white,
  },
  avatar: {
    width: '91@ms',
    height: '91@ms',
    borderRadius: '45.5@ms',
  },
  username: {
    fontFamily: Fonts.semiBold,
    fontSize: '20@ms',
    marginTop: Metrics.smallMargin,
  },
  trainerSkills: {
    width: '50%',
    textAlign: 'center',
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
    color: Colors.grey2,
    marginVertical: '2@ms',
  },
  button: {
    width: '78%',
    marginVertical: Metrics.baseMargin,
  },
  actionButton: {
    position: 'absolute',
    flexDirection: 'row',
    right: Metrics.smallMargin,
    top: Metrics.baseMargin,
  },
  icon: {
    marginLeft: '12@ms',
  },
  manageMyClassContainer: {
    backgroundColor: Colors.mediumGrey,
    borderRadius: 20,
    height: '38@ms',
    width: Metrics.width / 2 - 21,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 10,
  },
  rowButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.baseMargin,
  },
  editProfileText: {
    fontSize: '12@ms',
    fontFamily: Fonts.semiBold,
  },
  editProfileContainer: {
    backgroundColor: Colors.darkPrimary,
    borderRadius: 20,
    height: '38@ms',
    width: Metrics.width / 2 - 21,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mapStyle: {
    width: Metrics.width,
    height: Metrics.height / 2,
    marginVertical: 20,
  },
  locationIcon: {
    width: Metrics.width,
    height: Metrics.height / 2,
    position: 'absolute',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

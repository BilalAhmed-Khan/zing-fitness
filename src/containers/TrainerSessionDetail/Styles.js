import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
  },
  secMain: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 30,
    bsssorderTopRightRadius: 30,
  },
  ButText: {
    fontFamily: Fonts.semiBold,
    fontSize: '14@ms',
  },
  bigBox: {
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    height: '100@ms',
    justifyContent: 'center',
    paddingHorizontal: Metrics.smallMargin,
  },
  bigBoxText: {
    fontFamily: Fonts.regular,
    fontSize: '15@ms',
  },
  unitText: {
    fontSize: '14@ms',
  },
  innerBox: {
    width: Metrics.width / 2 - 20,
  },
  fullMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.smallMargin,
  },
  fullBox: {
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    height: '51@ms',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
  },
  timeFull: {
    fontFamily: Fonts.regular,
    fontSize: '13@ms',
  },
  trainerDetailText: {
    fontFamily: Fonts.regular,
    fontSize: '18@ms',
  },
  trainerDOB: {
    fontFamily: Fonts.regular,
    fontSize: '12@ms',
  },
  box: {
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    height: '51@ms',
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,
    flex: 0.49,
  },
  bottomMainView: {
    marginHorizontal: Metrics.smallMargin,
  },
  textHead: {
    fontFamily: Fonts.semiBold,
    fontSize: '14@ms',
    paddingVertical: Metrics.smallMargin,
  },
  textHeadSession: {
    fontFamily: Fonts.regular,
    fontSize: '14@ms',
    paddingTop: Metrics.miniMargin + 3,
    marginBottom: Metrics.smallMargin,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.darkBlack,
  },
  ButtonStyle: {
    width: '88@ms',
    height: '31@ms',
    backgroundColor: Colors.darkPrimary,
  },
  textStyle: {
    fontFamily: Fonts.medium,
    fontSize: '10@ms',
  },
  timeButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: Metrics.ratio(40),
  },
  location: {
    fontFamily: Fonts.regular,
    fontSize: '12@ms',
    color: Colors.lightGrey,
    flex: 0.9,
  },
  locationView: {
    flexDirection: 'row',
  },
  imageLocation: {
    marginRight: Metrics.smallMargin,
  },
  innerTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: Metrics.smallMargin,
  },
  usernameText: {
    fontFamily: Fonts.medium,
    fontSize: '15@ms',
  },
  timeText: {
    fontFamily: Fonts.regular,
    fontSize: '25@ms',
  },
  dateText: {
    fontFamily: Fonts.medium,
    fontSize: '11@ms',
  },
  textMainView: {
    flex: 1,
    paddingHorizontal: Metrics.smallMargin,
  },
  imageStyle: {
    width: 95,
    height: 90,
    borderRadius: 45,
  },
  mainView: {
    flex: 1,
    maxHeight: '28%',
    flexDirection: 'row',
  },
  tagView: {
    // alignSelf: 'flex-end',
    marginVertical: Metrics.miniMargin,
    padding: '6@ms',
    borderRadius: 8,
  },
  tagViewText: {
    color: Colors.white,
    fontSize: '11@ms',
  },
  listImageStyle: {
    width: 110,
    height: 160,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  textListTitle: {
    fontFamily: Fonts.medium,
    fontSize: '14@ms',
    paddingVertical: Metrics.miniMargin + 3,
  },
  listText: {
    fontFamily: Fonts.regular,
    fontSize: '14@ms',
    paddingTop: Metrics.miniMargin + 3,
    alignSelf: 'center',
  },
  countdigitStyle: {
    height: Metrics.ratio(28),
    // width: Metrics.ratio(15),
  },
  countdigitTxtStyle: {
    color: Colors.white,
    fontSize: Fonts.size.size_20,
  },
});

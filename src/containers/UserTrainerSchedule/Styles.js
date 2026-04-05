import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  selecteDateContainer: {
    paddingVertical: Metrics.baseMargin,
  },
  selectAppointment: {
    fontSize: '14@ms',
    fontFamily: Fonts.semiBold,
  },
  selectTimeContainer: {
    paddingVertical: Metrics.baseMargin,
  },
  paymentContainer: {
    paddingVertical: Metrics.baseMargin,
  },
  charges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.baseMargin,
  },
  chargeTitle: {
    fontSize: '13@ms',
    fontFamily: Fonts.regular,
  },
  chargeAmount: {
    fontSize: '30@ms',
    fontFamily: Fonts.semiBold,
  },
  childContainer: {
    marginVertical: Metrics.mediumMargin,
    marginHorizontal: Metrics.baseMargin,
    flexDirection: 'row',
  },
  ImageView: {
    height: '86@ms',
    width: '96@ms',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  nameUserID: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  username: {
    fontFamily: Fonts.medium,
    fontSize: '20@ms',
  },
  userid: {
    fontFamily: Fonts.regular,
    color: '#c8c8c8',
    marginLeft: Metrics.smallMargin,
  },
  imageStyle: {
    height: '80@ms',
    width: '90@ms',
    borderRadius: 8,
  },
  textView: {
    flex: 1,
    paddingLeft: 15,
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
    marginVertical: Metrics.smallMargin,
  },
  timeFull: {
    fontFamily: Fonts.regular,
    fontSize: '13@ms',
    flex: 0.9,
  },
  sessionDetail: {
    fontFamily: Fonts.medium,
    fontSize: '14@ms',
    marginBottom: Metrics.baseMargin,
  },
  textHead: {
    fontFamily: Fonts.semiBold,
    fontSize: '14@ms',
    paddingVertical: Metrics.smallMargin,
  },
  innerBox: {
    width: Metrics.width / 2 - 20,
  },
  fullMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.smallMargin,
  },
  trainerDetailText: {
    fontFamily: Fonts.regular,
    fontSize: '18@ms',
  },
  box: {
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    height: '51@ms',
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
    flex: 0.49,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
    // paddingHorizontal: Metrics.baseMargin,
  },
  horizontalLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.darkBlack,
  },
  bigBox: {
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    height: '100@ms',
    // justifyContent: 'center',
    paddingTop: 10,
    marginVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  bigBoxText: {
    fontFamily: Fonts.regular,
    fontSize: '15@ms',
  },
  listImageStyle: {
    width: 110,
    height: 160,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  headerViewStyle: {
    width: 110,
    height: 160,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

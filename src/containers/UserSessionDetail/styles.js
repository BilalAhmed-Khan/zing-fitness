import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  title: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  button: {
    marginTop: Metrics.baseMargin,
  },
  sessionTimeTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
  },
  imageAddTitle: {
    fontSize: '10@ms',
    fontFamily: Fonts.light,
  },
  addImageSize: {
    width: '30@ms',
    height: '30@ms',
    marginBottom: '5@ms',
  },
  selectTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    backgroundColor: Colors.tertiary,
    borderRadius: '8@ms',
    height: '155@ms',
    marginVertical: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    color: Colors.white,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    paddingTop: '10@ms',
  },
  textStyle: {
    padding: Metrics.baseMargin,
    color: Colors.white,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
  },
  descriptionView: {
    backgroundColor: Colors.tertiary,
    borderRadius: '8@ms',
    height: '155@ms',
    marginVertical: Metrics.baseMargin,
  },
  uploadImageMainView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 10,
    marginRight: 10,
  },
  uploadImageView: {
    width: Metrics.width / 2 - 20,
    height: '145@ms',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.darkPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: Metrics.width / 2 - 20,
    height: '145@ms',
    borderRadius: 12,
  },
  timeZoneTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    alignSelf: 'center',
    textTransform: 'uppercase',
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
    marginTop: Metrics.smallMargin,
  },
  timeFull: {
    fontFamily: Fonts.regular,
    fontSize: '13@ms',
  },
  rate: {
    fontFamily: Fonts.medium,
    fontSize: '25@ms',
  },
  fullMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.smallMargin,
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
  mapStyle: {
    // width: Metrics.width - 200,
    height: '188@ms',
    marginVertical: 20,
  },
  selectTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectTimeData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.width / 2 - 20,
    height: '51@ms',
    backgroundColor: Colors.tertiary,
    borderRadius: '14@ms',
    alignItems: 'center',
    paddingLeft: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
  },
  text: {
    color: Colors.white,
    fontSize: '21@ms',
    fontFamily: Fonts.regular,
    width: '80%',
  },
  clock: {
    width: '16@ms',
    height: '16@ms',
  },
});

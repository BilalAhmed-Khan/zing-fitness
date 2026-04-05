import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Metrics.smallMargin,
  },
  uploadTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  sessionTimeTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  multilineTextInputView: {
    height: '155@ms',
  },
  multilineTextInput: {
    height: '155@ms',
    paddingTop: '10@ms',
  },
  textInput: {
    backgroundColor: Colors.tertiary,
    borderRadius: '8@ms',
    height: '50@ms',
    marginVertical: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    color: Colors.white,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    paddingTop: '15@ms',
  },
  selectTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageViewStyle: {
    width: Metrics.width / 2 - 24,
    height: 145,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  uploadImageMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  addImageSize: {
    width: '30@ms',
    height: '30@ms',
    marginBottom: '5@ms',
  },
  imageAddTitle: {
    fontSize: '10@ms',
    fontFamily: Fonts.light,
  },
  timeZoneTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    // alignSelf: 'center',
    textTransform: 'uppercase',
  },
  breakTimeTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  button: {
    marginTop: Metrics.baseMargin,
  },
});

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
  textInputView: {
    height: '155@ms',
  },
  textInput: {
    height: '155@ms',
    paddingTop: '10@ms',
  },
  imageViewStyle: {
    width: Metrics.width / 2 - 20,
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
    height: 145,
    borderRadius: 12,
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
});

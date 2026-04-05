import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
  },
  secMain: {
    flex: 1,
    borderTopLeftRadius: 30,
    margin: 0,
    borderTopRightRadius: 30,
  },
  reportImage: {
    alignSelf: 'center',
    marginRight: Metrics.smallMargin,
  },
  reportView: {
    marginVertical: Metrics.smallMargin,
    flexDirection: 'row',
  },
  reportText: {
    color: '#CFCFCF',
    fontFamily: Fonts.regular,
    fontSize: '15@ms',
  },
  ButText: {
    fontFamily: Fonts.semiBold,
    fontSize: '14@ms',
  },
  textInput: {
    height: '130@ms',
    color: '#A7A7A7',
    fontFamily: Fonts.regular,
    fontSize: '12@ms',
  },
  textInputView: {
    height: '150@ms',
    paddingTop: '10@ms',
  },
  textNew: {
    fontFamily: Fonts.regular,
    fontSize: '11@ms',
    marginVertical: Metrics.smallMargin,
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
    alignSelf: 'center',
  },
  location: {
    fontFamily: Fonts.regular,
    fontSize: '14@ms',
    color: Colors.lightGrey,
  },
  locationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLocation: {
    marginRight: Metrics.smallMargin,
  },
  innerTopView: {
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
  textMainView: {
    flex: 1,
    paddingHorizontal: Metrics.smallMargin,
  },
  mainView: {
    alignItems: 'center',
  },
  imageStyle: {
    width: 95,
    height: 90,
    borderRadius: 45,
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
});

/** @format */

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

const ImageContainer = Metrics.width * 0.32;
const ImageHeight = Metrics.width * 0.27;

export default StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  mainContainer: {
    backgroundColor: Colors.tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Metrics.ratio(10),
    paddingBottom: Metrics.bottomPadding,
    maxHeight: Metrics.height * 0.55,
  },
  itemContainer: {
    height: 51,
    // flexDirection: 'row',
    marginHorizontal: Metrics.ratio(30),
    // alignItems: 'center',
  },
  halfContainer: {
    height: ImageContainer / 2,
  },
  textStyle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.white,
  },
  imageStyle: {
    marginRight: Metrics.ratio(20),
  },
  descriptionStyle: { marginVertical: 12 },
  crossContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 7,
  },
  cancelTextView: {
    alignSelf: 'flex-start',
  },
  cancelText: {
    marginVertical: 0,
    marginVertical: 30,
    marginLeft: 30,
    fontFamily: Fonts.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.white,
  },
  cancelWithTitleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 0,
    marginVertical: 30,
  },
  titleText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.size.size_18,
    fontWeight: '400',
    color: Colors.black,
    // alignItems: "center",
    textAlign: 'center',
    flex: 0.8,
    // backgroundColor: "red",
  },
  cancelTitleText: {
    marginLeft: 30,
    fontFamily: Fonts.regular,
    fontSize: Fonts.size.size_16,
    color: Colors.white,
  },
  imageContainer: {
    position: 'absolute',
    left: 50,
    right: 50,
    alignItems: 'center',
  },
  imageBorderContainer: {
    height: ImageContainer,
    width: ImageContainer,
    borderWidth: Metrics.ratio(11),
    borderRadius: ImageContainer / 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  image: {
    height: ImageHeight,
    width: ImageHeight,
    borderRadius: ImageHeight / 2,
  },
  buttonTextStyle: {
    color: Colors.purply,
    // fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_20,
  },
  buttonStyle: {
    marginBottom: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(20),
    borderWidth: 1,
    borderColor: Colors.purply,
  },
});

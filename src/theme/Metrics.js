import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const miniMargin = 3;
const smallMargin = 8;
const baseMargin = 16;
const mediumMargin = 24;
const largeMargin = 28;
const megaMargin = 42;

const getScreenWidthPercentage = percent => (percent / 100) * width;
const getScreenHeightPercentage = percent => (percent / 100) * height;

const generatedFontSize = (iosFontSize, androidFontSize, doScale = false) =>
  Platform.select({
    ios: doScale ? scaleVertical(iosFontSize) : iosFontSize,
    android: doScale
      ? scaleVertical(androidFontSize || iosFontSize)
      : androidFontSize || iosFontSize,
  });

const ratio = (iosSize, androidSize, doScale = false) =>
  Platform.select({
    ios: doScale ? scaleVertical(iosSize) : iosSize,
    android: doScale
      ? scaleVertical(androidSize || iosSize)
      : androidSize || iosSize,
  });

export default {
  miniMargin,
  smallMargin,
  baseMargin,
  mediumMargin,
  largeMargin,
  megaMargin,
  getScreenWidthPercentage,
  getScreenHeightPercentage,
  width,
  height,
  generatedFontSize,
  ratio,
};

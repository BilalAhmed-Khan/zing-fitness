import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  containerContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mapContent: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: Metrics.baseMargin,
    justifyContent: 'space-between',
  },
  buttonAbsolute: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    left: 10,
  },
  MultiSliderAsolute: {
    position: 'absolute',
    top: 130,
    right: 10,
    left: 10,
    alignItems: 'center',
    zIndex: 0,
  },
  searchInputAsbolute: {
    position: 'absolute',
    // alignItems: 'center',
    top: 15,
    right: 10,
    // bottom: 15,
    left: 10,
    alignItems: 'center',
    // padding: Metrics.baseMargin,
    // justifyContent: 'space-between',
  },
  locationIcon: {
    position: 'absolute',
    alignItems: 'center',
    width: 146,
    height: 146,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparentGrey,
    borderRadius: 146 / 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.mapGrey,
  },

  mapContentInnerContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    marginVertical: Metrics.baseMargin,
    textTransform: 'uppercase',
  },
  searchInput: {
    marginVertical: 0,
  },
  milesSlider: {
    width: Metrics.width - 32,
  },
  milesTitle: {
    fontSize: '13@ms',
    fontFamily: Fonts.semiBold,
    marginTop: Metrics.baseMargin,

    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  milesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miles: {
    fontSize: '13@ms',
    fontFamily: Fonts.semiBold,
    alignSelf: 'center',
    marginLeft: 5,
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  searchInputStyle: {
    textInputContainer: {
      alignSelf: 'center',
      // width: Metrics.screenWidth * 0.8,
      justifyContent: 'center',
      borderRadius: 10,
      paddingHorizontal: 5,
    },
    textInput: {
      color: Colors.black,
      fontSize: 16,
      width: Metrics.width * 0.6,
      top: 3,
    },
    predefinedPlacesDescription: {
      color: Colors.black,
    },
    row: {
      backgroundColor: Colors.seperator,
    },
    poweredContainer: {
      backgroundColor: Colors.seperator,
    },
  },
});

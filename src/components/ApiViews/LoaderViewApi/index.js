import { ActivityIndicator, View, ViewPropTypes, Image } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Colors, AppStyles, Images } from '../../../theme';

const LoaderViewApi = ({ style, size, animating }) => (
  <View style={[AppStyles.containerflex, AppStyles.alignCenterView, style]}>
    <ActivityIndicator {...{ size, animating }} color={Colors.primary} />
    {/* <Image source={Images.gifs.loader} style={{width: 70, height: 70}} /> */}
  </View>
);

LoaderViewApi.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.oneOf(['small', 'large']),
  animating: PropTypes.bool,
};

LoaderViewApi.defaultProps = { size: 'large', animating: true };

export default LoaderViewApi;

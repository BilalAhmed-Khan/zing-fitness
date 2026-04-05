import React, { memo } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyles from '../../config/MapStyles.json';
import { Styles } from './Styles';

const Map = ({ latitude, longitude }) => {
  return (
    <View style={Styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={Styles.map}
        region={{
          latitude: latitude ?? -1,
          longitude: longitude ?? -1,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyles}
      />
    </View>
  );
};

export default memo(Map);

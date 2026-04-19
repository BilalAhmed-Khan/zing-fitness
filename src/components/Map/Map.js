import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import MapStyles from '../../config/MapStyles.json';
import { Images } from '../../theme';
import { Styles } from './Styles';

const labelText = m => {
  const t = m.title != null ? String(m.title).trim() : '';
  return t !== '' ? t : 'Trainer';
};

const isValidCoord = (lat, lng) =>
  typeof lat === 'number' &&
  typeof lng === 'number' &&
  !Number.isNaN(lat) &&
  !Number.isNaN(lng) &&
  lat !== -1 &&
  lng !== -1;

const Map = ({ latitude, longitude, markers = [] }) => {
  const mapRef = useRef(null);

  const validMarkers = useMemo(
    () => markers.filter(m => isValidCoord(m.latitude, m.longitude)),
    [markers],
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map || validMarkers.length === 0) {
      return;
    }
    const coordinates = validMarkers.map(m => ({
      latitude: m.latitude,
      longitude: m.longitude,
    }));
    const t = setTimeout(() => {
      if (!mapRef.current) {
        return;
      }
      try {
        if (coordinates.length === 1) {
          mapRef.current.animateToRegion(
            {
              ...coordinates[0],
              latitudeDelta: 0.06,
              longitudeDelta: 0.05,
            },
            400,
          );
        } else {
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
            animated: true,
          });
        }
      } catch {
        // map not ready
      }
    }, 300);
    return () => clearTimeout(t);
  }, [validMarkers]);

  return (
    <View style={Styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={Styles.map}
        region={{
          latitude: latitude ?? -1,
          longitude: longitude ?? -1,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyles}>
        {validMarkers.map(m => (
          <Marker
            key={m.id}
            coordinate={{
              latitude: m.latitude,
              longitude: m.longitude,
            }}
            anchor={{ x: 0.5, y: 1 }}
            tracksViewChanges={false}>
            <View style={Styles.markerStack}>
              <View style={Styles.markerLabel}>
                <Text style={Styles.markerLabelText} numberOfLines={2}>
                  {labelText(m)}
                </Text>
              </View>
              <Image
                source={Images.locationPin}
                style={Styles.markerPin}
                resizeMode="contain"
              />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default memo(Map);

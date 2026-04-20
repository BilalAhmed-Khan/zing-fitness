import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Image, Text, View } from 'react-native';
import {
  Animated as AnimatedMapView,
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

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

const FALLBACK = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

/** Approximate fit-to-coordinates as an AnimatedRegion target (Google-style camera). */
function regionForMarkersAndSession(
  latitude,
  longitude,
  validMarkers,
  fitBottomPadding,
) {
  const sessionOk = isValidCoord(latitude, longitude);
  const bottomBoost = fitBottomPadding > 200 ? 1.14 : 1;

  if (validMarkers.length === 0) {
    if (!sessionOk) {
      return { ...FALLBACK };
    }
    return {
      latitude,
      longitude,
      latitudeDelta: 0.015 * bottomBoost,
      longitudeDelta: 0.0121 * bottomBoost,
    };
  }

  const coords = validMarkers.map(m => ({
    latitude: m.latitude,
    longitude: m.longitude,
  }));

  if (sessionOk) {
    coords.push({ latitude, longitude });
  }

  if (coords.length === 1) {
    return {
      latitude: coords[0].latitude,
      longitude: coords[0].longitude,
      latitudeDelta: 0.06 * bottomBoost,
      longitudeDelta: 0.05 * bottomBoost,
    };
  }

  const lats = coords.map(c => c.latitude);
  const lngs = coords.map(c => c.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  let latDelta = Math.max((maxLat - minLat) * 1.75, 0.04);
  let lngDelta = Math.max((maxLng - minLng) * 1.75, 0.035);
  latDelta *= bottomBoost;
  lngDelta *= 1.05;

  const latMid = (minLat + maxLat) / 2;
  const lngMid = (minLng + maxLng) / 2;
  const shift =
    fitBottomPadding > 200 ? Math.min(latDelta * 0.12, 0.08) : latDelta * 0.05;

  return {
    latitude: latMid + shift,
    longitude: lngMid,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  };
}

const Map = ({ latitude, longitude, markers = [], fitBottomPadding = 100 }) => {
  const validMarkers = useMemo(
    () => markers.filter(m => isValidCoord(m.latitude, m.longitude)),
    [markers],
  );

  const lat0 =
    latitude != null && latitude !== -1 ? latitude : FALLBACK.latitude;
  const lng0 =
    longitude != null && longitude !== -1 ? longitude : FALLBACK.longitude;

  const region = useRef(
    new AnimatedRegion({
      latitude: lat0,
      longitude: lng0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }),
  );

  const cameraKey = useMemo(() => {
    const m = validMarkers
      .map(x => `${x.id}:${x.latitude}:${x.longitude}`)
      .join('|');
    return `${latitude}|${longitude}|${m}|${fitBottomPadding}`;
  }, [latitude, longitude, validMarkers, fitBottomPadding]);

  useEffect(() => {
    const target = regionForMarkersAndSession(
      latitude,
      longitude,
      validMarkers,
      fitBottomPadding,
    );
    const anim = region.current.timing({
      ...target,
      duration: 520,
      useNativeDriver: false,
    });
    anim.start();
  }, [cameraKey, latitude, longitude, validMarkers, fitBottomPadding]); // cameraKey drives refits; lat/lng/markers used in closure

  return (
    <View style={Styles.container}>
      <AnimatedMapView
        provider={PROVIDER_GOOGLE}
        style={Styles.map}
        region={region.current}
        onRegionChange={r => region.current.setValue(r)}
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
      </AnimatedMapView>
    </View>
  );
};

export default memo(Map);

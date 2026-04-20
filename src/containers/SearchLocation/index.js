import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, View } from 'react-native';
import Slider from '@react-native-community/slider';

import {
  Map,
  Container,
  Text,
  SearchInput,
  Button,
  Loader,
} from '../../components';

import { Styles } from './styles';
import { Colors, Images, Metrics } from '../../theme';
import { GeocodeUtil, LocationUtil, NavigationService, Util } from '../../utils';
import { COORDINATES_DELTA, GOOGLE_SEARCH } from '../../config/Constants';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyles from '../../config/MapStyles.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { createSession } from '../../ducks/auth';

const initialRegion = {
  latitude: -1,
  longitude: -1,
  ...COORDINATES_DELTA,
};

const isValidCoordPair = (lat, lng) =>
  typeof lat === 'number' &&
  typeof lng === 'number' &&
  !Number.isNaN(lat) &&
  !Number.isNaN(lng) &&
  lat !== -1 &&
  lng !== -1;

const labelsRoughlyMatch = (a, b) => {
  const x = (a ?? '').trim().toLowerCase();
  const y = (b ?? '').trim().toLowerCase();
  if (!x || !y) {
    return true;
  }
  if (x === y || x.includes(y) || y.includes(x)) {
    return true;
  }
  const words = s =>
    new Set(
      s
        .split(/[\s,.]+/)
        .map(w => w.trim())
        .filter(w => w.length > 2),
    );
  const wx = words(x);
  const wy = words(y);
  let overlap = 0;
  wx.forEach(w => {
    if (wy.has(w)) {
      overlap += 1;
    }
  });
  return overlap >= 1;
};

const SearchLocation = ({ route }) => {
  const onSaveLocation = route?.params?.onSaveLocation ?? undefined;
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [address, setAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState(initialRegion);
  const [mapCenter, setMapCenter] = useState(null);
  const mapRef = useRef();

  const _onPress = async () => {
    const textLabel = (
      inputText?.trim() ||
      (typeof address === 'object' && address?.address ? address.address : '') ||
      ''
    ).trim();

    if (
      typeof address === 'object' &&
      address != null &&
      isValidCoordPair(address.lat, address.lng)
    ) {
      const resolvedLabel = (address.address || '').trim();
      if (labelsRoughlyMatch(textLabel, resolvedLabel)) {
        onSaveLocation?.(textLabel || resolvedLabel || 'Selected location', [
          address.lng,
          address.lat,
        ]);
        return;
      }
    }

    let lat;
    let lng;

    if (
      mapCenter != null &&
      isValidCoordPair(mapCenter.latitude, mapCenter.longitude)
    ) {
      lat = mapCenter.latitude;
      lng = mapCenter.longitude;
    }

    if (mapRef.current?.getCamera) {
      try {
        const cam = await mapRef.current.getCamera();
        if (cam?.center && isValidCoordPair(cam.center.latitude, cam.center.longitude)) {
          lat = cam.center.latitude;
          lng = cam.center.longitude;
        }
      } catch (_) {
        /* map may not be ready */
      }
    }

    if (!isValidCoordPair(lat, lng)) {
      lat = currentLocation.latitude;
      lng = currentLocation.longitude;
    }

    if (isValidCoordPair(lat, lng)) {
      const label =
        textLabel ||
        (typeof address === 'object' && address?.address) ||
        'Selected location';
      onSaveLocation?.(label, [lng, lat]);
      return;
    }

    if (!textLabel) {
      Util.showMessage('Please enter a location');
      return;
    }

    GeocodeUtil.getAddressObject(textLabel, (result, isSuccess) => {
      if (isSuccess) {
        onSaveLocation?.(result.address, [result.lng, result.lat]);
        return;
      }
      if (
        mapCenter != null &&
        isValidCoordPair(mapCenter.latitude, mapCenter.longitude)
      ) {
        onSaveLocation?.(textLabel, [mapCenter.longitude, mapCenter.latitude]);
        return;
      }
      Util.showMessage(
        typeof result === 'string' ? result : 'Location not found',
      );
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const setCoordinateMap = (region, animate = true) => {
    if (animate && !isLoading && mapRef.current !== null) {
      mapRef.current.animateToRegion({ ...region, ...COORDINATES_DELTA }, 1500);
    }
  };
  useEffect(() => {
    if (!isLoading) {
      LocationUtil.getCurrentLocation(
        locationobj => {
          console.log('locationobj', locationobj);
          GeocodeUtil.getAddressObject(
            {
              lat: locationobj.lat,
              lng: locationobj.lng,
            },
            (result, isSuccess) => {
              if (isSuccess) {
                saveAndDisplayAddress(result);
              }
            },
          );
          setCurrentLocation({
            latitude: locationobj.lat,
            longitude: locationobj.lng,
            ...COORDINATES_DELTA,
          });
          setCoordinateMap({
            latitude: locationobj.lat,
            longitude: locationobj.lng,
          });
        },
        false,
        false,
      );
    }
  }, [mapRef.current, isLoading]);

  const onSearch = text => {
    // set text
    console.log(text);
    setInputText(text);
  };
  const saveAndDisplayAddress = info => {
    console.log('info ==>', info);
    setInputText(info?.address);
    setAddress(info);
  };
  const applyResolvedPlace = result => {
    setCurrentLocation({
      latitude: result.lat,
      longitude: result.lng,
      ...COORDINATES_DELTA,
    });
    setCoordinateMap({
      latitude: result.lat,
      longitude: result.lng,
    });
    saveAndDisplayAddress(result);
  };
  const searchFromQuery = rawQuery => {
    const trimmed = (rawQuery ?? '').trim();
    if (!trimmed) {
      Util.showMessage('Please enter a location');
      return;
    }
    Keyboard.dismiss();
    GeocodeUtil.getAddressObject(trimmed, (result, isSuccess) => {
      if (isSuccess) {
        applyResolvedPlace(result);
      } else {
        Util.showMessage(
          typeof result === 'string' ? result : 'Location not found',
        );
      }
    });
  };
  const onSelectAutoSuggest = (data, details = null) => {
    console.log(details, data);
    setCoordinateMap({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setCurrentLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      ...COORDINATES_DELTA,
    });
    GeocodeUtil.getAddressObject(
      {
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
      },
      (result, isSuccess) => {
        if (isSuccess) {
          saveAndDisplayAddress(result);
        }
      },
    );
  };

  return (
    <>
      <Container
        headerTitle="SELECT LOCATION"
        contentStyle={Styles.containerContent}>
        <View style={Styles.mapContainer}>
          {!isLoading && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={Styles.map}
              ref={mapRef}
              customMapStyle={MapStyles}
              onRegionChangeComplete={region => {
                setMapCenter({
                  latitude: region.latitude,
                  longitude: region.longitude,
                });
              }}
            />
          )}
          {/* <MapContent /> */}
          <View style={Styles.locationIcon}>
            <Image source={Images.locationSetting} />
          </View>

          {/* <View style={{ height: 50, width: Metrics.width * 0.95 }}> */}
          <View style={Styles.searchInputAsbolute}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              textInputProps={{
                placeholderTextColor: Colors.black,
                returnKeyType: 'search',
                value: inputText,
                onChangeText: onSearch,
                onSubmitEditing: () => searchFromQuery(inputText),
              }}
              fetchDetails={true}
              styles={Styles.searchInputStyle}
              onPress={onSelectAutoSuggest}
              query={GOOGLE_SEARCH}
            />
          </View>
          <View style={Styles.buttonAbsolute} pointerEvents="box-none">
            <Button largeButton title="SAVE" onPress={_onPress} />
          </View>
        </View>
      </Container>
    </>
  );
};

export default SearchLocation;

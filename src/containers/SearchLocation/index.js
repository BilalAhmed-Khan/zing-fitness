import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
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
import { GeocodeUtil, LocationUtil, NavigationService } from '../../utils';
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

const SearchLocation = ({ route }) => {
  const onSaveLocation = route?.params?.onSaveLocation ?? undefined;
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [address, setAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState(initialRegion);
  const mapRef = useRef();

  const _onPress = () => {
    const cordinates = [currentLocation.longitude, currentLocation.latitude];
    const location = address?.address;
    console.log('address', address);
    console.log('currentLocation', currentLocation);
    onSaveLocation?.(location, cordinates);
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

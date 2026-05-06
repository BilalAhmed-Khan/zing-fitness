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
  Dropdown,
  TextInputNative,
} from '../../components';

import { Styles } from './Styles';
import { Colors, Images, Metrics } from '../../theme';
import {
  GeocodeUtil,
  LocationUtil,
  NavigationService,
  Util,
} from '../../utils';
import { COORDINATES_DELTA, GOOGLE_SEARCH } from '../../config/Constants';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyles from '../../config/MapStyles.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import {
  authEditProfile,
  createSession,
  getSessionData,
  getUserData,
} from '../../ducks/auth';
import { UserUtill } from '../../dataUtils';
import { getUserRole } from '../../ducks/general';
import { TIME_ZONES } from '../../config/TimeZones';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { DropDown } from '../../modal';

const initialRegion = {
  latitude: -1,
  longitude: -1,
  ...COORDINATES_DELTA,
};

const toCoordNumber = value => {
  if (typeof value === 'function') {
    return Number(value());
  }
  return Number(value);
};

/** [lng, lat] — prefers map center when valid, then geocode object (APIs may return string coords). */
const resolveProfileCoordinates = (address, currentLocation) => {
  const mapLat = currentLocation?.latitude;
  const mapLng = currentLocation?.longitude;
  if (
    typeof mapLat === 'number' &&
    typeof mapLng === 'number' &&
    !Number.isNaN(mapLat) &&
    !Number.isNaN(mapLng) &&
    mapLat !== -1 &&
    mapLng !== -1
  ) {
    return [mapLng, mapLat];
  }
  if (address && typeof address === 'object') {
    const aLat = toCoordNumber(address.lat);
    const aLng = toCoordNumber(address.lng);
    if (
      !Number.isNaN(aLat) &&
      !Number.isNaN(aLng) &&
      aLat !== 0 &&
      aLng !== 0
    ) {
      return [aLng, aLat];
    }
  }
  return null;
};

const profileAddressString = address => {
  if (address && typeof address === 'object') {
    return address.address ?? '';
  }
  if (typeof address === 'string') {
    return address;
  }
  return '';
};

const isValidCoordPair = (lat, lng) =>
  typeof lat === 'number' &&
  typeof lng === 'number' &&
  !Number.isNaN(lat) &&
  !Number.isNaN(lng) &&
  lat !== -1 &&
  lng !== -1;

const MilesSlider = ({ value, onChange }) => {
  return (
    <View style={Styles.milesSlider}>
      <Text style={Styles.milesTitle}>Coverage Miles</Text>
      <Slider
        minimumValue={10}
        maximumValue={50}
        minimumTrackTintColor={Colors.white}
        maximumTrackTintColor={Colors.white}
        thumbImage={Images.thumb}
        step={10}
        onSlidingComplete={onChange}
        value={value}
      />
      <View style={Styles.milesContainer}>
        <Text style={Styles.miles}>10</Text>
        <Text style={Styles.miles}>20</Text>
        <Text style={Styles.miles}>30</Text>
        <Text style={Styles.miles}>40</Text>
        <Text style={Styles.miles}>50</Text>
      </View>
    </View>
  );
};

const TrainerServiceAreas = ({ route }) => {
  const payload = route?.params?.payload ?? {};
  const isEdit = route?.params?.isEdit ?? false;
  const dropDownModalRef = useRef();
  const placesRef = useRef();
  const userData = useSelector(getUserData);
  const isTrainee = useSelector(getUserRole);
  // console.log('userData ===>', userData);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState(UserUtill.address(userData));
  const [address, setAddress] = useState(UserUtill.address(userData));
  const [miles, setMiles] = useState(UserUtill.coverageMiles(userData));
  // const [fetchingCurrentLocation, setFetchingCurrentLocation] = useState(false);

  const [formObj, timeZoneProps] = useHookForm(
    ['timeZone'],
    {
      timeZone: UserUtill.timeZone(userData),
    },
    ValidationSchema.userLocation,
  );
  const [currentLocation, setCurrentLocation] = useState(
    isEdit
      ? {
          latitude: isTrainee
            ? UserUtill.serviceArealat(userData)
            : UserUtill.lat(userData),
          longitude: isTrainee
            ? UserUtill.serviceArealong(userData)
            : UserUtill.long(userData),
          ...COORDINATES_DELTA,
        }
      : initialRegion,
  );
  // const [isRegionComplete, setIsRegionComplete] = useState(false);
  const mapRef = useRef();
  const geocodeSeqRef = useRef(0);

  const runReverseGeocode = (lat, lng, onApplied) => {
    const nLat = toCoordNumber(lat);
    const nLng = toCoordNumber(lng);
    if (Number.isNaN(nLat) || Number.isNaN(nLng)) {
      return;
    }
    const seq = ++geocodeSeqRef.current;
    GeocodeUtil.getAddressObject({ lat: nLat, lng: nLng }, (result, isSuccess) => {
      if (seq !== geocodeSeqRef.current) {
        return;
      }
      if (isSuccess) {
        onApplied(result);
      }
    });
  };
  const applyResolvedPlace = result => {
    const lat = toCoordNumber(result?.lat);
    const lng = toCoordNumber(result?.lng);
    if (!isValidCoordPair(lat, lng)) {
      return;
    }
    setCurrentLocation({
      latitude: lat,
      longitude: lng,
      ...COORDINATES_DELTA,
    });
    setCoordinateMap({
      latitude: lat,
      longitude: lng,
    });
    saveAndDisplayAddress({
      ...result,
      lat,
      lng,
    });
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
  const _onPress = () => {
    // NavigationService.navigate('TrainerApp');
    // console.log('address', address);
    // console.log('miles', miles);
    // console.log('currentLocation', currentLocation);
    let payloadApi = {};
    if (miles === 0) {
      Util.showMessage('Please Select the range of cover');
      return;
    }

    const cordinates = resolveProfileCoordinates(address, currentLocation);
    if (!cordinates) {
      Util.showMessage('Please select a valid location');
      return;
    }
    payloadApi = {
      address: profileAddressString(address),
      coverageMiles: miles,
      currentLongitude: cordinates[0],
      currentLatitude: cordinates[1],
      // location: { cordinates, },
    };

    if (isTrainee) {
      payloadApi.serviceArea = {
        cordinates,
      };
      payloadApi.location = {
        cordinates,
      };
    } else {
      payloadApi.location = {
        cordinates,
      };
    }

    dispatch(
      authEditProfile.request({
        payloadApi,
        id: UserUtill.id(userData),
        cb: () => {
          Util.showMessage(
            isEdit
              ? 'Your location has been updated successfully.'
              : 'Your location has been saved successfully.',
            'sucess',
          );
          if (isEdit) {
            NavigationService.goBack();
          } else {
            NavigationService.reset('TrainerApp');
          }
        },
      }),
    );
    // console.log(payloadApi);
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
    if (!isLoading && UserUtill.address(userData) === '') {
      LocationUtil.getCurrentLocation(
        locationobj => {
          // console.log('locationobj', locationobj);
          // getGolfCourseData(locationobj, () => {});
          runReverseGeocode(locationobj.lat, locationobj.lng, saveAndDisplayAddress);
          // saveAndDisplayAddress(locationobj);
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
    } else {
      // console.log(UserUtill.lat(userData), UserUtill.long(userData));
      runReverseGeocode(
        isTrainee
          ? UserUtill.serviceArealat(userData)
          : UserUtill.lat(userData),
        isTrainee
          ? UserUtill.serviceArealong(userData)
          : UserUtill.long(userData),
        saveAndDisplayAddress,
      );
      setCoordinateMap({
        latitude: isTrainee
          ? UserUtill.serviceArealat(userData)
          : UserUtill.lat(userData),
        longitude: isTrainee
          ? UserUtill.serviceArealong(userData)
          : UserUtill.long(userData),
      });
    }
  }, [mapRef.current, isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (
      !isValidCoordPair(currentLocation?.latitude, currentLocation?.longitude)
    ) {
      return;
    }
    const t = setTimeout(() => {
      mapRef.current?.animateToRegion(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          ...COORDINATES_DELTA,
        },
        600,
      );
    }, 250);
    return () => clearTimeout(t);
  }, [currentLocation?.latitude, currentLocation?.longitude, isLoading]);

  const onSearch = text => {
    // set text
    // console.log(text);
    setInputText(text);
  };
  const saveAndDisplayAddress = (info, { syncSearchField = true } = {}) => {
    const nextText = info?.address ?? '';
    setAddress(info);
    if (syncSearchField) {
      setInputText(nextText);
      placesRef.current?.setAddressText(nextText);
    }
  };
  const onSelectAutoSuggest = (data, details = null) => {
    const loc = details?.geometry?.location;
    if (!loc) {
      return;
    }
    const lat = toCoordNumber(loc.lat);
    const lng = toCoordNumber(loc.lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return;
    }
    setCurrentLocation({
      latitude: lat,
      longitude: lng,
      ...COORDINATES_DELTA,
    });
    setCoordinateMap({ latitude: lat, longitude: lng });
    runReverseGeocode(lat, lng, saveAndDisplayAddress);
  };

  const onRegionChangeComplete = region => {
    if (!isLoading) {
      setCurrentLocation(prev => {
        if (prev.latitude === -1 && prev.longitude === -1) {
          return prev;
        }
        return {
          latitude: region.latitude,
          longitude: region.longitude,
          ...COORDINATES_DELTA,
        };
      });
      runReverseGeocode(region.latitude, region.longitude, result =>
        saveAndDisplayAddress(result, { syncSearchField: false }),
      );
    }
  };

  const _onChangeValue = value => {
    setMiles(value);
  };
  const timeZoneOnPress = onChange => {
    dropDownModalRef.current.show({
      data: Util.sortArrayById(TIME_ZONES),
      onPress: item => {
        // console.log(item);
        onChange(item?.label);
        // setSelectedStates(item?.state_code);
      },
    });
  };

  const submit = formObj.handleSubmit(values => {
    // console.log('values', values);
    values.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cordinates = resolveProfileCoordinates(address, currentLocation);
    if (!cordinates) {
      Util.showMessage('Please select a valid location');
      return;
    }
    const payloadApi = {
      address: profileAddressString(address),
      timeZone: values.timeZone,
      currentLongitude: cordinates[0],
      currentLatitude: cordinates[1],
      location: { cordinates },
    };
    const newPayload = {
      ...payload,
      ...payloadApi,
    };
    // console.log('payload', newPayload);
    dispatch(
      authEditProfile.request({
        payloadApi: newPayload,
        id: UserUtill.id(userData),
        cb: () => {
          Util.showMessage(
            isEdit
              ? 'Your location has been updated successfully.'
              : 'Your location has been saved successfully.',
            'sucess',
          );
          if (isEdit) {
            NavigationService.goBack();
          } else {
            NavigationService.reset('UserApp');
          }
        },
      }),
    );
    // NavigationService.navigate('UserHealthProblems', { payload: newPayload });
    // NavigationService.navigate('TrainerServiceAreas', { payload: newPayload });
  });

  return (
    <>
      <Container
        headerTitle={
          isTrainee ? 'SERVICE AREAS & COVERAGE' : 'USER REGISTRATION'
        }
        contentStyle={Styles.containerContent}>
        <View style={Styles.mapContainer}>
          {!isLoading && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={Styles.map}
              ref={mapRef}
              customMapStyle={MapStyles}
              initialRegion={
                currentLocation.latitude !== -1 &&
                currentLocation.longitude !== -1
                  ? { ...currentLocation }
                  : undefined
              }
              onRegionChangeComplete={onRegionChangeComplete}
            />
          )}
          {/* <MapContent /> */}
          <View style={Styles.locationIcon}>
            <Image source={Images.locationSetting} />
          </View>
          <View style={Styles.MultiSliderAsolute}>
            {isTrainee ? (
              <MilesSlider value={miles} onChange={_onChangeValue} />
            ) : (
              // <TextInputNative
              //   placeholder="Select Timezone"
              //   {...timeZoneProps}
              //   containerStyle={{
              //     width: Metrics.width - 20,
              //   }}
              //   onPress={timeZoneOnPress}
              // />
              <></>
            )}
          </View>
          {/* <View style={{ height: 50, width: Metrics.width * 0.95 }}> */}
          <View style={Styles.searchInputAsbolute}>
            <Text style={Styles.heading}>
              {isTrainee ? 'Service Areas' : 'YOUR LOCATION & TIME ZONE'}
            </Text>
            <GooglePlacesAutocomplete
              ref={placesRef}
              placeholder="Search"
              textInputProps={{
                placeholderTextColor: Colors.black,
                returnKeyType: 'search',
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
            <Button
              largeButton
              title="SUBMIT PROFILE"
              onPress={isTrainee ? _onPress : submit}
            />
          </View>
        </View>
      </Container>
      <DropDown ref={dropDownModalRef} />
      <Loader type={'AUTH_EDIT_PROFILE'} />
    </>
  );
};

export default TrainerServiceAreas;

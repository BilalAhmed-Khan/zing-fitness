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

    const cordinates = [address.lng, address.lat];
    payloadApi = {
      address: address?.address,
      coverageMiles: miles,
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
          isEdit
            ? NavigationService.goBack()
            : NavigationService.reset('TrainerApp');
          if (isEdit) {
            Util.showMessage(
              'Your Location has been updated sucessfully',
              'sucess',
            );
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
      GeocodeUtil.getAddressObject(
        {
          lat: isTrainee
            ? UserUtill.serviceArealat(userData)
            : UserUtill.lat(userData),
          lng: isTrainee
            ? UserUtill.serviceArealong(userData)
            : UserUtill.long(userData),
        },
        (result, isSuccess) => {
          if (isSuccess) {
            saveAndDisplayAddress(result);
          }
        },
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

  const onSearch = text => {
    // set text
    // console.log(text);
    setInputText(text);
  };
  const saveAndDisplayAddress = info => {
    // console.log(info);
    setInputText(info?.address);
    setAddress(info);
    // console.log('saveAndDisplayAddress ==>', info);
  };
  const onSelectAutoSuggest = (data, details = null) => {
    // console.log(details, data);
    setCoordinateMap({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
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

  const onRegionChangeComplete = region => {
    if (!isLoading) {
      GeocodeUtil.getAddressObject(
        {
          lat: region.latitude,
          lng: region.longitude,
        },
        (result, isSuccess) => {
          if (isSuccess) {
            saveAndDisplayAddress(result);
          }
        },
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
    const cordinates = [address.lng, address.lat];
    const payloadApi = {
      address: address?.address,
      timeZone: values.timeZone,
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
          isEdit
            ? NavigationService.goBack()
            : NavigationService.reset('UserApp');
          if (isEdit) {
            Util.showMessage(
              'Your Location has been updated sucessfully',
              'sucess',
            );
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

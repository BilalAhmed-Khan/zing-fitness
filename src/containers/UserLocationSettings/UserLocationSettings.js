import React, { useCallback, useState } from 'react';
import { View, Image, Text as RNText } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Text,
  Button,
  Map,
  ButtonView,
  Loader,
} from '../../components';
import { UserUtill } from '../../dataUtils';
import { authEditProfile, getUserData } from '../../ducks/auth';
import { Colors, Fonts, Images } from '../../theme';
import { NavigationService, Util } from '../../utils';

import SearchInputStyles from '../../components/SearchInput/Styles';
import { Styles } from './Styles';

const coordsFromUser = user => {
  const raw = UserUtill.location(user);
  const lng = raw?.[0];
  const lat = raw?.[1];
  if (
    typeof lng === 'number' &&
    typeof lat === 'number' &&
    !Number.isNaN(lng) &&
    !Number.isNaN(lat)
  ) {
    return [lng, lat];
  }
  return [];
};

const isValidCoordPair = c =>
  Array.isArray(c) &&
  c.length >= 2 &&
  typeof c[0] === 'number' &&
  typeof c[1] === 'number' &&
  !Number.isNaN(c[0]) &&
  !Number.isNaN(c[1]);

const UserLocationSettings = () => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [cordinates, setCordinates] = useState(() => coordsFromUser(userData));
  const [address, setAddress] = useState(UserUtill.address(userData));

  const openLocationPicker = useCallback(() => {
    NavigationService.navigate('SearchLocation', {
      onSaveLocation: (location, nextCoords) => {
        setAddress(location);
        setCordinates([...nextCoords]);
        NavigationService.goBack();
      },
    });
  }, []);

  const onSave = () => {
    if (!isValidCoordPair(cordinates)) {
      Util.showMessage('Please select a location');
      return;
    }
    dispatch(
      authEditProfile.request({
        payloadApi: {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          location: { cordinates },
          address,
        },
        id: UserUtill.id(userData),
        cb: () => {
          Util.showMessage(
            'Your location has been updated successfully',
            'sucess',
          );
        },
      }),
    );
  };

  const latForMap =
    cordinates.length >= 2 ? cordinates[1] : UserUtill.lat(userData);
  const lngForMap =
    cordinates.length >= 2 ? cordinates[0] : UserUtill.long(userData);

  const MapContent = () => (
    <View style={Styles.mapContent} pointerEvents="box-none">
      <View style={Styles.mapContentInnerContainer}>
        <Text style={Styles.heading}>Your location</Text>
        <ButtonView onPress={openLocationPicker}>
          <View style={[SearchInputStyles.container, Styles.searchInput]}>
            <Image source={Images.search} />
            <RNText
              style={[
                SearchInputStyles.textInput,
                Styles.searchAddressText,
                {
                  color: address ? Colors.secondary : Colors.placeholderText,
                  fontFamily: Fonts.regular,
                },
              ]}
              numberOfLines={2}>
              {address || 'Search..'}
            </RNText>
          </View>
        </ButtonView>
      </View>
      <Button largeButton title="Save" onPress={onSave} />
    </View>
  );
  const MapContainer = () => (
    <View style={Styles.mapContainer}>
      <Map latitude={latForMap} longitude={lngForMap} />
      <MapContent />
    </View>
  );
  return (
    <Container
      contentStyle={Styles.containerContent}
      headerTitle="Settings"
      notificationCount="2"
      chat>
      <MapContainer />
      <Loader type={authEditProfile.type} />
    </Container>
  );
};

export default UserLocationSettings;

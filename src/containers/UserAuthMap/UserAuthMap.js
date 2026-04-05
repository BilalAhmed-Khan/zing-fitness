import React from 'react';
import { View } from 'react-native';

import {
  Map,
  Container,
  Text,
  SearchInput,
  Button,
  Dropdown,
} from '../../components';
import { TIME_ZONES } from '../../config/TimeZones';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const UserAuthMap = () => {
  const _onPressStartTraining = () => {
    NavigationService.navigate('UserApp');
  };

  const MapContent = () => (
    <View style={Styles.mapContent} pointerEvents="box-none">
      <View style={Styles.mapContentInnerContainer}>
        <Text style={Styles.heading}>Your location & Time zone</Text>
        <SearchInput isLocation style={Styles.searchInput} />
        <Dropdown placeholder="Select Timezone" data={TIME_ZONES} />
      </View>
      <Button
        largeButton
        title="Start Training"
        onPress={_onPressStartTraining}
      />
    </View>
  );
  const MapContainer = () => (
    <View style={Styles.mapContainer}>
      <Map />
      <MapContent />
    </View>
  );
  return (
    <Container
      headerTitle="User Registration"
      contentStyle={Styles.containerContent}>
      <MapContainer />
    </Container>
  );
};

export default UserAuthMap;

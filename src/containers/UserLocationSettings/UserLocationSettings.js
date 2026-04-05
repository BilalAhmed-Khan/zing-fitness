import React from 'react';
import { View } from 'react-native';

import { Container, Text, SearchInput, Button, Map } from '../../components';

import { Styles } from './Styles';

const UserLocationSettings = () => {
  const MapContent = () => (
    <View style={Styles.mapContent} pointerEvents="box-none">
      <View style={Styles.mapContentInnerContainer}>
        <Text style={Styles.heading}>Your location</Text>
        <SearchInput isLocation style={Styles.searchInput} />
      </View>
      <Button largeButton title="Save" />
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
      contentStyle={Styles.containerContent}
      headerTitle="Settings"
      notificationCount="2"
      chat>
      <MapContainer />
    </Container>
  );
};

export default UserLocationSettings;

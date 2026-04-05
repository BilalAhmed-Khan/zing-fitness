import React, { useState } from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';

import { Map, Container, Text, SearchInput, Button } from '../../components';

import { Styles } from './Styles';
import { Colors, Images } from '../../theme';
import { NavigationService } from '../../utils';

const MilesSlider = () => {
  const [miles, setMiles] = useState(0);

  const _onChangeValue = value => {
    setMiles(value);
  };

  return (
    <View style={Styles.milesSlider}>
      <Text style={Styles.milesTitle}>Coverage Miles</Text>
      <Slider
        minimumValue={0}
        maximumValue={200}
        minimumTrackTintColor={Colors.white}
        maximumTrackTintColor={Colors.white}
        thumbImage={Images.thumb}
        step={50}
        onSlidingComplete={_onChangeValue}
        value={miles}
      />
      <View style={Styles.milesContainer}>
        <Text style={Styles.miles}>0</Text>
        <Text style={Styles.miles}>50</Text>
        <Text style={Styles.miles}>100</Text>
        <Text style={Styles.miles}>150</Text>
        <Text style={Styles.miles}>200</Text>
      </View>
    </View>
  );
};

const TrainerLocationSettings = () => {
  const _onPress = () => {
    NavigationService.navigate('TrainerApp');
  };

  const MapContent = () => (
    <View style={Styles.mapContent} pointerEvents="box-none">
      <View style={Styles.mapContentInnerContainer}>
        <Text style={Styles.heading}>Service Areas</Text>
        <SearchInput isLocation style={Styles.searchInput} />
        <MilesSlider />
      </View>
      <Button largeButton title="Save" onPress={_onPress} />
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
      headerTitle="Location Settings"
      contentStyle={Styles.containerContent}>
      <MapContainer />
    </Container>
  );
};

export default TrainerLocationSettings;

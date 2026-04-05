import React from 'react';
import { View } from 'react-native';
import {
  Container,
  Text,
  Dropdown,
  AvailableDayAndTime,
  Button,
} from '../../components';
import { TIME_ZONES } from '../../config/TimeZones';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const TrainerEditSchedule = () => {
  const _onPress = () => {
    NavigationService.goBack();
  };
  const BreakTime = () => (
    <View>
      <Text style={Styles.breakTimeTitle}>Enter Break Time</Text>
      <Dropdown placeholder="30 Minutes" data={[]} />
    </View>
  );
  return (
    <Container headerTitle="Schedule Settings">
      <AvailableDayAndTime />
      <BreakTime />
      <Button
        title="Save"
        largeButton
        style={Styles.button}
        onPress={_onPress}
      />
    </Container>
  );
};

export default TrainerEditSchedule;

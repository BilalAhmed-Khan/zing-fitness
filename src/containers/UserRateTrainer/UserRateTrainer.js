import React from 'react';
import { Pressable, Image, View, TextInput } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import { Container, Text, Button } from '../../components';
import { Images } from '../../theme';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const UserRateTrainer = () => {
  const _onPress = () => {
    NavigationService.navigate('UserApp');
  };
  const Avatar = () => (
    <Pressable style={Styles.avatarContainer}>
      <Image style={Styles.avatar} source={{ uri: 'https://bit.ly/3JxFYHQ' }} />
    </Pressable>
  );
  const Line = () => <View style={Styles.line} />;
  const TrainingTitles = () => (
    <View style={Styles.titlesContainer}>
      <Text style={Styles.title}>Crossfit Trainer</Text>
      <Line />
      <Text style={Styles.title}>Group Session</Text>
      <Line />
      <Text style={Styles.title}>1 Hour</Text>
    </View>
  );
  const TrainingDayAndTime = () => (
    <View style={Styles.dayAndTimeContainer}>
      <Text>Monday</Text>
      <Line />
      <Text>11:00 AM</Text>
    </View>
  );
  const Location = () => (
    <View style={Styles.locationContainer}>
      <Image source={Images.locationPin} />
      <Text style={Styles.location}>Taos, NM</Text>
    </View>
  );
  const Timer = () => <Text style={Styles.time}>00:00:00</Text>;
  return (
    <Container headerTitle="Trainer Ratings" notificationCount="2" chat>
      <Avatar />
      <Text style={Styles.trainerName}>James Anderson</Text>
      <TrainingTitles />
      <TrainingDayAndTime />
      <Location />
      <Timer />
      <AirbnbRating count={5} showRating={false} defaultRating={5} size={20} />
      <Text style={Styles.label}>Any Comments/Suggestions:</Text>
      <TextInput
        multiline
        style={Styles.textInput}
        placeholder="Write review..."
        placeholderTextColor="#666666"
      />
      <Button title="Submit" onPress={_onPress} style={Styles.button} />
    </Container>
  );
};

export default UserRateTrainer;

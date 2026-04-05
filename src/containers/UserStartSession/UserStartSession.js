import React from 'react';
import { Pressable, Image, View } from 'react-native';

import { Container, Text, Button } from '../../components';
import { Images } from '../../theme';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const UserStartSession = () => {
  const _onPress = () => {
    NavigationService.navigate('UserEndSession');
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
  const TrainerCover = () => (
    <Image
      style={Styles.trainerCover}
      source={{ uri: 'https://bit.ly/3JxFYHQ' }}
    />
  );
  const TrainingOverview = () => (
    <View style={Styles.detailsContainer}>
      <Text style={Styles.detailsHeading}>Training Overview</Text>
      <Text style={Styles.details}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea.
      </Text>
    </View>
  );
  const TrainingTechnique = () => (
    <View style={Styles.detailsContainer}>
      <Text style={Styles.detailsHeading}>Training Technique</Text>
      <Text style={Styles.details}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea.
      </Text>
    </View>
  );
  const Equipment = () => (
    <View style={Styles.detailsContainer}>
      <Text style={Styles.detailsHeading}>Equipment</Text>
      <View style={Styles.equipmentImageContainer}>
        <Image
          style={Styles.equipmentImage}
          source={{ uri: 'https://bit.ly/3JxFYHQ' }}
        />
        <Image
          style={Styles.equipmentImage}
          source={{ uri: 'https://bit.ly/3JxFYHQ' }}
        />
        <Image
          style={Styles.equipmentImage}
          source={{ uri: 'https://bit.ly/3JxFYHQ' }}
        />
      </View>
    </View>
  );
  return (
    <Container headerTitle="Session Detail" notificationCount="2" chat>
      <Avatar />
      <Text style={Styles.trainerName}>James Anderson</Text>
      <TrainingTitles />
      <TrainingDayAndTime />
      <Location />
      <Timer />
      <TrainerCover />
      <TrainingOverview />
      <TrainingTechnique />
      <Equipment />
      <Button title="End Session" onPress={_onPress} />
    </Container>
  );
};

export default UserStartSession;

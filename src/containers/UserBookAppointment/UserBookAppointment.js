import React from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Dropdown, Button } from '../../components';
import { Images } from '../../theme';
import { NavigationService } from '../../utils';
import { Styles } from './Styles';

const UserBookAppointment = () => {
  const onPressNext = () => {
    NavigationService.navigate('UserTrainerSchedule');
  };
  const TrainerAvatar = () => (
    <View style={Styles.trainerAvatarContainer}>
      <Image
        source={{ uri: 'https://bit.ly/3Irpboz' }}
        style={Styles.trainerAvatar}
      />
    </View>
  );
  const TrainerDetails = () => (
    <View style={Styles.trainerDetails}>
      <Text style={Styles.trainerName}>Fletch Skinner</Text>
      <Text style={Styles.trainerSkill}>Crossfit</Text>
      <View style={Styles.locationContainer}>
        <Image source={Images.locationPin} />
        <Text style={Styles.location}>Eastlake, Ohio, 44095</Text>
      </View>
    </View>
  );
  const TrainerIntro = () => (
    <View style={Styles.trainerIntro}>
      <TrainerAvatar />
      <TrainerDetails />
    </View>
  );
  const MakeAppointment = () => (
    <View style={Styles.appointmentContainer}>
      <Text style={Styles.appointmentHeading}>Make A Session</Text>
      <Dropdown placeholder="Location" data={[]} />
      <Dropdown placeholder="Session Type" data={[]} />
      <Dropdown placeholder="Session Duration" data={[]} />
      <Dropdown placeholder="Speciality of Session Chosen" data={[]} />
      <Button title="Next" style={Styles.buton} onPress={onPressNext} />
    </View>
  );
  return (
    <Container headerTitle="Book An Appointment" notificationCount="2" chat>
      <TrainerIntro />
      <MakeAppointment />
    </Container>
  );
};

export default UserBookAppointment;

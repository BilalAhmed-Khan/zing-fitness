import React from 'react';
import {
  Container,
  SelectImage,
  Dropdown,
  TextInput,
  PhoneNumberInput,
  Button,
} from '../../components';

import { GENDER } from '../../config/Constants';
import { navigate } from '../../services/NavigationService';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const TrainerSignup = () => {
  const onPressRegister = () => {
    NavigationService.navigate('Verification');
    // navigate('TrainerNumberVerification');
  };

  return (
    <Container headerTitle="Trainer Registration" style={Styles.container}>
      <SelectImage />
      <Dropdown placeholder="Select Gender" data={GENDER} />
      <TextInput placeholder="First Name" />
      <TextInput placeholder="Last Name" />
      <TextInput placeholder="Email Address*" keyboardType="email-address" />
      <PhoneNumberInput />
      <TextInput placeholder="Years of Experience*" keyboardType="numeric" />
      <TextInput placeholder="Password" isPassword />
      <TextInput placeholder="Confirm Password" isPassword />
      <Button title="REGISTER NOW" largeButton onPress={onPressRegister} />
    </Container>
  );
};

export default TrainerSignup;

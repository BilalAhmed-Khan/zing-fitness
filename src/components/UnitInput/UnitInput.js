import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { RadioButton, Text } from '../';

import { Styles } from './Styles';

const UserInput = ({ title, buttons, unitText = 'cm' }) => {
  console.log(buttons?.unit);
  const Input = () => (
    <View style={Styles.inputContainer}>
      <TextInput style={Styles.input} keyboardType="numeric" maxLength={3} />
      <Text style={Styles.unit}>{unitText}</Text>
    </View>
  );
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{title}</Text>
      <RadioButton buttons={buttons} />
      <Input />
    </View>
  );
};

UserInput.propTypes = {
  title: PropTypes.string,
  buttons: PropTypes.array.isRequired,
};

export default UserInput;

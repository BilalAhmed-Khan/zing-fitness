import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Text, ButtonView } from '../';

import { Styles } from './Styles';

const RadioButton = ({
  buttons,
  style,
  buttonStyle,
  buttonTextStyle,
  isOnline = false,
  onButtonPress,
}) => {
  let active = isOnline ? 1 : 2;
  const Button = ({ id, title }) => (
    <ButtonView
      onPress={() => {
        onButtonPress?.(id === 1 ? true : false, () => {});
      }}
      style={[
        Styles.button,
        buttonStyle,
        active === id && Styles.activeButton,
      ]}>
      <Text style={[Styles.buttonTitle, buttonTextStyle]}>{title}</Text>
    </ButtonView>
  );

  return (
    <View style={[Styles.container, style]}>
      {buttons.map(({ id, label }) => (
        <Button key={id} title={label} id={id} />
      ))}
    </View>
  );
};

RadioButton.propTypes = {
  buttons: PropTypes.array.isRequired,
};

export default RadioButton;

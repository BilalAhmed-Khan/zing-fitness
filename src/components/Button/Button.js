import React from 'react';
import { Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';

import Styles from './Styles';
import ButtonView from '../ButtonView';

const Button = ({
  title,
  onPress,
  style,
  largeButton,
  titleStyle,
  width,
  ...rest
}) => {
  const largeButtonStyle = largeButton ? Styles.largeButton : {};

  return (
    <ButtonView
      style={[Styles.container, largeButtonStyle, style]}
      onPress={onPress}
      {...rest}>
      <Text style={[Styles.title, titleStyle]}>{title}</Text>
    </ButtonView>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  largeButton: PropTypes.bool,
};

export default Button;

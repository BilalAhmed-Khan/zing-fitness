import React, { useState } from 'react';
import { View, TextInput as RNTextInput, Image, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';
import { Colors, Images } from '../../theme';

const TextInput = ({
  inputStyle,
  placeholder,
  isPassword = false,
  styleTextInput,
  ...rest
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isPassword);
  const onPressEye = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };
  const eyeColor = isSecureTextEntry ? Styles.disabledEye : {};

  const EyeButton = () => {
    if (isPassword) {
      return (
        <Pressable hitSlop={10} onPress={onPressEye}>
          <Image source={Images.eye} style={eyeColor} />
        </Pressable>
      );
    }
    return null;
  };
  return (
    <View style={[Styles.container, inputStyle]}>
      <RNTextInput
        style={[Styles.textInput, styleTextInput]}
        placeholder={placeholder}
        placeholderTextColor={Colors.white}
        secureTextEntry={isSecureTextEntry}
        {...rest}
      />
      <EyeButton />
    </View>
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default TextInput;

import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { View, Image, TextInput } from 'react-native';
import { InputError, Text } from '..';

import PropTypes from 'prop-types';
import _ from 'lodash';
import { Colors } from '../../theme';
import styles from './styles';

const SessionRateInput = ({
  control,
  name,
  forwardRef,
  title,
  defaultValue,
  nextFocusRef,
  error,
  customPlaceholder,
  renderLeft,
  renderRight,
  required,
  showCharCount,
  maxLength,
  onPress,
  hint,
  onSubmit,
  multiline,
  multlineStyle,
  containerStyle,
  dropdownKey,
  formatValue,
  arrowDown,
  textAlign,
  setMultlineStyle,
  showTitle,
  customTitle,
  bottomSpaceLarge,
  topSpaceLarge,
  formatValueChange,
  disablePress,
  secureTextEntry,
  isPrice,
  onChangeCustom,
  isRightArrow,
  editable,
  tintColor,
  customBorderColor = Colors.grey,
  rightIcon,
  isImage,
  focusedPlaceholder = '',
  leftIcon,
  keyboardType,
  inputContainerStyle,
  inputViewStyle,
  isModal,
  customValue,
  isClass,
  minutes,
  ...rest
}) => {
  const Separator = () => <View style={styles.separator} />;
  // render input
  const renderInput = ({ onChange, onBlur: _onBlur, value }) => {
    // set border color
    let borderColor = customBorderColor;
    // if (error) {
    //   borderColor = Colors.errorInput;
    // } else if (isFocused) {
    //   borderColor = Colors.black;
    // }

    // set view tag
    const opacity = disablePress || editable === false ? 1 : 1;

    // input events
    const onChangeText = textInputValue => {
      // if (formatValueChange) {
      //   onChange && onChange(formatValueChange(textInputValue));
      // } else {
      onChange && onChange(textInputValue);
      // }
      // if (onChangeCustom) {
      //   onChangeCustom(textInputValue);
      // }
    };
    const onBlur = () => {
      // _onBlur && _onBlur();
      // setFocus(false);
    };
    const onFocus = () => {
      // setFocus(true);
    };

    const onSubmitEditing = () => {
      if (nextFocusRef) {
        nextFocusRef.current.focus();
      }
    };

    // set input value for dropdown
    const inputValue = dropdownKey ? value?.[dropdownKey] ?? '' : value;

    // custom style
    const customStyleMulti = multiline && setMultlineStyle ? multlineStyle : {};
    // render input

    return (
      <TextInput
        style={[styles.textInput]}
        keyboardType={keyboardType ?? 'number-pad'}
        placeholder={customPlaceholder}
        value={inputValue}
        ref={forwardRef}
        returnKeyType={onSubmit ? 'done' : 'next'}
        onSubmitEditing={onSubmit || onSubmitEditing}
        editable={_.isUndefined(editable) ? (onPress ? false : true) : editable}
        pointerEvents={onPress ? 'none' : 'auto'}
        selection={onPress ? { start: 0, end: 0 } : undefined}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={Colors.blue}
        maxLength={7}
        {...{
          onChangeText,
          onBlur,
          onFocus,
          multiline,
        }}
        {...rest}
      />
    );
  };

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  // render input controller
  const renderController = controlllerProps => {
    return (
      <View>
        <Text style={styles.sessionRateTitle}>
          {isClass ? 'CLASS RATE' : 'SESSION RATE'}
        </Text>
        <View style={styles.sessionRate}>
          <View style={styles.textInputContainer}>
            <Text style={styles.dollar}>$</Text>
            {renderInput(controlllerProps.field)}
          </View>
          <Separator />
          <Text style={styles.ratePerMin}>{`Rate per minutes`}</Text>
        </View>
        {renderError()}
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      //defaultValue={defaultValue}
      render={renderController}
    />
  );
};

SessionRateInput.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  multlineStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  required: PropTypes.bool,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  forwardRef: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  customPlaceholder: PropTypes.string,
  onChangeCustom: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  nextFocusRef: PropTypes.object,
  error: PropTypes.object,
  onPress: PropTypes.func,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  showCharCount: PropTypes.bool,
  maxLength: PropTypes.number,
  hint: PropTypes.string,
  onSubmit: PropTypes.func,
  multiline: PropTypes.bool,
  dropdownKey: PropTypes.string,
  formatValue: PropTypes.func,
  formatValueChange: PropTypes.func,
  arrowDown: PropTypes.bool,
  setMultlineStyle: PropTypes.bool,
  textAlign: PropTypes.string,
  showTitle: PropTypes.bool,
  customTitle: PropTypes.string,
  bottomSpaceLarge: PropTypes.bool,
  topSpaceLarge: PropTypes.bool,
  disablePress: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  isPrice: PropTypes.bool,
  isRightArrow: PropTypes.bool,
  editable: PropTypes.bool,
  tintColor: PropTypes.string,
  isImage: PropTypes.bool,
  keyboardType: PropTypes.string,
  isModal: PropTypes.bool,
  isClass: PropTypes.bool,
  minutes: PropTypes.string,
};
SessionRateInput.defaultProps = {
  containerStyle: {},
  multlineStyle: styles.multline,
  setMultlineStyle: true,
  required: false,
  error: undefined,
  defaultValue: '',
  nextFocusRef: undefined,
  onChangeCustom: undefined,
  formatValueChange: undefined,
  onPress: undefined,
  customPlaceholder: '',
  renderLeft: undefined,
  renderRight: undefined,
  showCharCount: false,
  maxLength: 10000,
  hint: '',
  tintColor: `${Colors.white}`,
  onSubmit: undefined,
  multiline: false,
  dropdownKey: '',
  formatValue: undefined,
  arrowDown: true,
  textAlign: 'left',
  showTitle: true,
  customTitle: '',
  bottomSpaceLarge: false,
  topSpaceLarge: false,
  disablePress: false,
  secureTextEntry: false,
  isPrice: false,
  isRightArrow: false,
  isImage: true,
  keyboardType: undefined,
  isModal: false,
  isClass: false,
  minutes: 15,
};

export default SessionRateInput;

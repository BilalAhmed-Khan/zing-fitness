/** @format */

import { View, TextInput, Image } from 'react-native';
import { Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ButtonView, InputError } from '../';
import { Colors, Images } from '../../theme';
import styles from './styles';

const TextInputNative = props => {
  // destruct props
  const {
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
    autoCapitalize,
    ...rest
  } = props;

  // set state focus
  const [isFocused, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (secureTextEntry) {
      forwardRef?.current?.setNativeProps({
        // style: { fontFamily: Fonts.type.semiBold },
      });
    }
  }, [forwardRef, secureTextEntry]);

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
        style={[
          styles.input,
          inputContainerStyle,
          customStyleMulti,
          // { textAlign },
          multiline && { textAlignVertical: 'top' },
        ]}
        keyboardType={keyboardType ?? 'default'}
        placeholderTextColor={Colors.white}
        placeholder={customPlaceholder}
        value={customValue ? customValue : inputValue}
        ref={forwardRef}
        returnKeyType={onSubmit ? 'done' : 'next'}
        onSubmitEditing={onSubmit || onSubmitEditing}
        editable={_.isUndefined(editable) ? (onPress ? false : true) : editable}
        pointerEvents={onPress ? 'none' : 'auto'}
        selection={onPress ? { start: 0, end: 0 } : undefined}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        secureTextEntry={secureTextEntry && !showPassword}
        selectionColor={Colors.blue}
        {...{
          maxLength,
          onChangeText,
          onBlur,
          onFocus,
          multiline,
        }}
        {...rest}
      />
    );
  };

  // render input container
  const renderInputContainer = controlllerProps => {
    // set view tag
    // console.log(controlllerProps);
    const TagView = onPress && disablePress === false ? ButtonView : View;
    // const TagView = View;
    let borderColor = customBorderColor;
    let borderRadius = 0;
    let borderWidth = 0;

    // if (error) {
    //   borderColor = Colors.errorInput;
    //   borderWidth = 1;
    // }
    // if (isFocused) {
    //   borderColor = Colors.black;
    //   borderRadius = 0;
    //   borderWidth = 1;
    // }
    // if (!isFocused && controlllerProps.value) {
    //   borderColor = Colors.black;
    //   borderWidth = 1;
    // }

    return (
      <TagView
        onPress={() => {
          onPress(controlllerProps.onChange, controlllerProps.value);
        }}
        enableClick={true}
        debounceTime={10}
        style={[styles.inputViewStyle, inputViewStyle]}>
        <View pointerEvents={onPress ? 'none' : 'auto'}>
          {renderInput(controlllerProps)}
        </View>
        <View style={styles.rightIcon}>{renderRightView()}</View>
      </TagView>
    );
  };

  const renderRightView = () => {
    if (secureTextEntry) {
      return (
        <ButtonView
          hitSlop={10}
          onPress={() => {
            setShowPassword(!showPassword);
          }}>
          <Image source={Images.eye} style={Colors.grey1} />
        </ButtonView>
      );
    }
    if (renderRight) {
      return renderRight();
    }
    return <></>;
  };

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  // render input controller
  const renderController = controlllerProps => {
    let customStyle = bottomSpaceLarge ? styles.bottomSpace : {};
    if (topSpaceLarge) {
      customStyle = styles.topSpace;
    }
    return (
      <View style={[customStyle, containerStyle]}>
        {renderInputContainer(controlllerProps.field)}
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

TextInputNative.propTypes = {
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
  autoCapitalize: PropTypes.string,
};
TextInputNative.defaultProps = {
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
  customPlaceholder: '_',
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
  autoCapitalize: 'none',
};

export default TextInputNative;

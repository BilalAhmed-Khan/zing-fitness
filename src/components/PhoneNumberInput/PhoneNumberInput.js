import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-native-phone-number-input';
import { Colors } from '../../theme';
import InputError from '../InputError';
import { Styles } from './Styles';

const PhoneNumberInput = ({ defaultValue, error, code, setCode, ...rest }) => {
  // const [value, setValue] = useState('');
  // const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);

  const renderError = () => {
    return <InputError error={error} />;
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <PhoneInput
              ref={phoneInput}
              disableArrowIcon
              defaultValue={value}
              defaultCode={code ?? 'US'}
              layout="first"
              onChangeText={onChange}
              onChangeCountry={text => {
                setCode(text.cca2);
              }}
              flagButtonStyle={Styles.flagButton}
              containerStyle={Styles.container}
              textContainerStyle={Styles.textContainer}
              textInputStyle={Styles.textInputStyle}
              codeTextStyle={Styles.codeStyle}
              textInputProps={{
                selectionColor: Colors.white,
                placeholderTextColor: Colors.white,
              }}
              // countryPickerProps={{ style: { backgroundColor: 'red' } }}
            />
            {renderError()}
          </>
        );
      }}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default PhoneNumberInput;

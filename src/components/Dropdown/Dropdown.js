import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import PropTypes from 'prop-types';

import { Styles } from './Styles';
import { Controller } from 'react-hook-form';
import InputError from '../InputError';
import { View } from 'react-native';

const Dropdown = ({
  placeholder,
  data = [],
  defaultValue,
  error,
  onChangeCustom,
  customStyle,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(data);

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          <DropDownPicker
            style={[Styles.container, customStyle]}
            flatListProps={{ contentContainerStyle: Styles.dropdownContainer }}
            textStyle={Styles.text}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={val => {
              onChange(val());
              onChangeCustom?.(val());
            }}
            setItems={setItems}
            arrowIconStyle={Styles.arrowIcon}
            placeholder={placeholder}
          />
          {renderError()}
        </>
      )}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.array,
};

export default Dropdown;

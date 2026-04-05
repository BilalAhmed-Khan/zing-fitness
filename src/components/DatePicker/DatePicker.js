import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';

import { Text, InputError } from '../';
import { Colors, Images } from '../../theme';

import Styles from './Styles';
import dayjs from 'dayjs';

const DatePicker = ({
  placeholder = 'Select Date',
  value,
  onChange,
  error,
  extraProps = {},
  isAge,
}) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  // const [selectedDate, setSelecteDate] = useState(value ? new Date() : null);
  // console.log(selectedDate);
  const [open, setOpen] = useState(false);

  const _onPress = () => {
    setOpen(true);
  };

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };
  const currentYear = new Date().getFullYear();

  console.log('date ==>', new Date('1970'), date);
  return (
    <>
      <Pressable style={Styles.container} onPress={_onPress}>
        {isAge ? (
          <Text style={Styles.text}>{currentYear - date.getFullYear()}</Text>
        ) : (
          <>
            <Text style={Styles.text}>
              {value ? dayjs(date).format('MM/DD/YYYY') : placeholder}
            </Text>
            <Image source={Images.calendarSmall} />
          </>
        )}
        <RNDatePicker
          modal
          mode="date"
          open={open}
          date={date}
          textColor={Colors.black}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            // setSelecteDate(date);
            if (isAge) {
              onChange(currentYear - date.getFullYear());
            } else {
              onChange(date);
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
          theme={'light'}
          {...extraProps}
        />
      </Pressable>
      {renderError()}
    </>
  );
};

DatePicker.propTypes = {
  placeholder: PropTypes.string,
};

export default DatePicker;

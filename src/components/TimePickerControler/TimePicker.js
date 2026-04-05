import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';

import { Text } from '../';
import { Images } from '../../theme';

import Styles from './Styles';
import dayjs from 'dayjs';

const TimePicker = ({ title = '', placeholder = 'Select Time' }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelecteDate] = useState(date);
  const [open, setOpen] = useState(false);

  const _onPress = () => {
    setOpen(true);
  };

  return (
    <Pressable onPress={_onPress}>
      <Text style={Styles.title}>{title}</Text>
      <View style={Styles.container} onPress={_onPress}>
        <Image source={Images.clock} style={Styles.clock} />
        <Text style={Styles.text}>
          {/* {selectedDate ? dayjs(selectedDate).format('hh:mm') : placeholder} */}
          {dayjs(selectedDate).format('hh:mm')}
        </Text>
        <RNDatePicker
          modal
          mode="time"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setSelecteDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </Pressable>
  );
};

TimePicker.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
};

export default TimePicker;

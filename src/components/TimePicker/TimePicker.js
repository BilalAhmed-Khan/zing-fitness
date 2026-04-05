import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import RNDatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';

import { Text } from '../';
import { Colors, Images } from '../../theme';

import Styles from './Styles';
import dayjs from 'dayjs';

const TimePicker = ({
  title = '',
  placeholder = 'Select Time',
  value,
  onChange,
  containerStyle,
  textStyle,
  isTitle = true,
  disabled,
}) => {
  // const [date, setDate] = useState(new Date());
  // const [selectedDate, setSelecteDate] = useState(date);
  console.log('value ==== >', value);
  const [open, setOpen] = useState(false);

  const _onPress = () => {
    setOpen(true);
  };

  return (
    <Pressable onPress={_onPress} disabled={disabled}>
      {isTitle && <Text style={Styles.title}>{title}</Text>}
      <View style={[Styles.container, containerStyle]} onPress={_onPress}>
        <Image source={Images.clock} style={Styles.clock} />
        <Text style={[Styles.text, textStyle]}>
          {dayjs(value).format('hh:mm A')}
        </Text>
        <RNDatePicker
          modal
          mode="time"
          open={open}
          date={value}
          onConfirm={date => {
            setOpen(false);
            onChange(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          textColor={Colors.black}
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

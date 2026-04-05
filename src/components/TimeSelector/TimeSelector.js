import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../';
import { Styles } from './Styles';
import { Colors } from '../../theme';
import { Util } from '../../utils';

const TimeItem = ({ time, selectedTime, setSelectedTime }) => {
  // const [selected, setSelected] = useState(false);
  const onPress = () => {
    // setSelected(!selected);
    setSelectedTime(time);
  };
  return (
    <Pressable
      onPress={onPress}
      style={[
        Styles.timeItem,
        selectedTime === time && { backgroundColor: Colors.primary },
      ]}>
      <Text style={Styles.time}>{Util.convert24HrTo12(time)}</Text>
    </Pressable>
  );
};

const TimeSelector = ({ timeList, selectedTime, setSelectedTime }) => {
  return timeList.length > 0 ? (
    <View style={Styles.container}>
      {timeList?.map(_time => (
        <TimeItem
          time={_time}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      ))}
    </View>
  ) : (
    <></>
  );
};

TimeSelector.propTypes = {
  timeList: PropTypes.array,
};

export default TimeSelector;

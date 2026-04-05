import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import { Text, TimePicker } from '../';
import { DAYS_LIST } from '../../config/Constants';

import { Styles } from './Styles';

const DayItem = ({ day, isSelected, onDaySelect, showOnly }) => {
  const { label } = day;

  return (
    <Pressable
      style={[Styles.dayItem, isSelected && Styles.selectedDayItem]}
      onPress={showOnly ? undefined : () => onDaySelect(day)}>
      <Text>{label}</Text>
    </Pressable>
  );
};

const AvailableDayAndTime = ({
  selectedDays,
  onDaySelect,
  isDummy = true,
  showOnly = false,
}) => {
  const DaySelector = () => (
    <View style={Styles.daySelectorContainer}>
      {DAYS_LIST.map(_day => (
        <DayItem
          day={_day}
          isSelected={selectedDays.includes(_day.day)}
          onDaySelect={onDaySelect}
          showOnly={showOnly}
        />
      ))}
    </View>
  );
  const SelectTime = () => (
    <View style={Styles.selectTime}>
      <TimePicker title="Start time" />
      <TimePicker title="End time" />
    </View>
  );
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>
        {showOnly ? ' Available Day & Time' : 'Select Available Day & Time'}
      </Text>
      <DaySelector />
      {isDummy && <SelectTime />}
    </View>
  );
};

export default AvailableDayAndTime;

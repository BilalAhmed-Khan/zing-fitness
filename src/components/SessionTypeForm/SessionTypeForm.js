import React, { useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

import PropTypes from 'prop-types';

import { Text, TrainingCategoryItem } from '../';

import { Colors, Images } from '../../theme';

import { Styles } from './Styles';

const SessionType = ({ data, isClass = false, showOnly = false }) => {
  const [minutes, setMinutes] = useState(15);
  const [selected, setSelected] = useState(false);
  const _onPress = () => {
    setSelected(!selected);
  };
  const _onChangeValue = value => {
    setMinutes(value);
  };

  const Separator = () => <View style={Styles.separator} />;
  const SessionRate = () => (
    <View>
      <Text style={Styles.sessionRateTitle}>
        {isClass ? 'CLASS RATE' : 'SESSION RATE'}
      </Text>
      <View style={Styles.sessionRate}>
        <View style={Styles.textInputContainer}>
          <Text style={Styles.dollar}>$</Text>
          <TextInput
            style={Styles.textInput}
            keyboardType="numeric"
            defaultValue={showOnly ? '50' : ''}
          />
        </View>
        <Separator />
        <Text style={Styles.ratePerMin}>{`Rate per ${minutes} Mins`}</Text>
      </View>
    </View>
  );
  const SessionTime = () => (
    <View style={Styles.sessionTimeContainer}>
      {!showOnly && (
        <>
          <Text style={Styles.sessionTimeTitle}>
            {isClass ? 'CLASS DURATION' : 'SESSION DURATION'}
          </Text>
          <Slider
            minimumValue={15}
            maximumValue={60}
            minimumTrackTintColor={Colors.white}
            maximumTrackTintColor={Colors.white}
            thumbImage={Images.thumb}
            step={5}
            onSlidingComplete={_onChangeValue}
            value={minutes}
          />
          <View style={Styles.minutesContainer}>
            <Text style={Styles.minutes}>15</Text>
            <Text style={Styles.minutes}>30</Text>
            <Text style={Styles.minutes}>60</Text>
          </View>
        </>
      )}
    </View>
  );
  return (
    <View>
      <SessionRate />
      <SessionTime />
    </View>
  );
};

SessionType.propTypes = {
  data: PropTypes.object,
};

export default SessionType;

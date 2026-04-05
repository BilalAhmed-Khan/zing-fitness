/** @format */

import React, { useState } from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import PropTypes from 'prop-types';

import { Colors } from '../../theme';
import styles from './styles';

const Switch = ({ value, onChange, disabled, toggleColor, onTogglePress }) => {
  const [toggleValue, onToggle] = useState(value);
  const onPressToggle = () => {
    // onChange(!value);
    onToggle(!value);
    onTogglePress(!value);
    // onToggle(!toggleValue);
  };

  return (
    <SwitchToggle
      switchOn={value}
      onPress={onPressToggle}
      duration={500}
      containerStyle={styles.containerStyle}
      // circleStyle={styles.circleStyle}
      circleColorOff={Colors.white}
      circleColorOn={Colors.white}
      backgroundColorOn={toggleColor ? toggleColor : Colors.primary}
      {...{ disabled }}
    />
  );
};

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Switch.defaultProps = { disabled: false };
export default Switch;

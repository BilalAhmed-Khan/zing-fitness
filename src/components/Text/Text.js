import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

import Styles from './Styles';

const Text = ({ children, style, ...rest }) => (
  <RNText style={[Styles.text, style]} {...rest}>
    {children}
  </RNText>
);

Text.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Text;

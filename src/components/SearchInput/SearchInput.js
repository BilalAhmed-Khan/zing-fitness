import React from 'react';
import { View, TextInput as RNTextInput, Image, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Images } from '../../theme';
import Styles from './Styles';
import ButtonView from '../ButtonView';

const SearchInput = ({
  style,
  isFilter,
  onPressFilter,
  isLocation,
  onChange,
  value,
}) => (
  <View style={[Styles.container, style]}>
    <Image source={Images.search} />
    <RNTextInput
      placeholder="Search.."
      placeholderTextColor={Colors.placeholderText}
      style={Styles.textInput}
      value={value}
      onChangeText={onChange}
    />
    <ButtonView onPress={onPressFilter}>
      <Image source={Images.filter} />
    </ButtonView>
  </View>
);

SearchInput.propTypes = {
  style: PropTypes.object,
  isFilter: PropTypes.bool,
  isLocation: PropTypes.bool,
  onPressFilter: PropTypes.func,
};

export default SearchInput;

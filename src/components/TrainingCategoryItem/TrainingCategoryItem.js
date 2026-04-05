import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { Images } from '../../theme';

import { Text, ButtonView, ImageView } from '../';
import { Styles } from './Styles';

const TrainingCategoryItem = ({ data, onPress, isSelected }) => {
  const { title, image } = data;

  return (
    <ButtonView
      onPress={() => onPress?.(data.id)}
      style={[Styles.container, isSelected && Styles.selectedContainer]}
      debounceTime={0}>
      <View style={Styles.innerContainer}>
        <Image source={{ uri: image }} style={Styles.imageStyle} />
        <Text style={Styles.title}>{title}</Text>
      </View>
      <Image
        source={isSelected ? Images.checkboxSelected : Images.checkboxEmpty}
      />
    </ButtonView>
  );
};

TrainingCategoryItem.propTypes = {
  data: PropTypes.object,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
};

export default TrainingCategoryItem;

import React from 'react';
import { ScrollView } from 'react-native';
import { TrainingCategoryItem } from '../';
import { TRAINING_CATEGORIES } from '../../config/Constants';

import { Styles } from './Styles';

const TrainingCategoriesList = () => {
  return (
    <ScrollView style={Styles.container}>
      {TRAINING_CATEGORIES.map(_category => (
        <TrainingCategoryItem data={_category} />
      ))}
    </ScrollView>
  );
};

export default TrainingCategoriesList;

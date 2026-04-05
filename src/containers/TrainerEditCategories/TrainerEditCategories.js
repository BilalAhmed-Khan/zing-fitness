import React from 'react';
import {
  Container,
  Text,
  TrainingCategoriesList,
  Button,
} from '../../components';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const TrainerEditCategories = () => {
  const _onPress = () => {
    NavigationService.goBack();
  };
  return (
    <Container headerTitle="Edit Training Categories">
      <TrainingCategoriesList />
      <Button title="Save" largeButton onPress={_onPress} />
    </Container>
  );
};

export default TrainerEditCategories;

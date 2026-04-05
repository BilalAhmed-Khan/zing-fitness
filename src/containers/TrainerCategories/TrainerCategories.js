import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Text,
  TrainingCategoriesList,
  Button,
  FlatListApi,
  TrainingCategoryItem,
  Loader,
} from '../../components';
import {
  getIdentifierAuthData,
  getIdentifierTrainer,
  getTraineeCategoriesData,
  getTrainerCategories,
  selectCategories,
} from '../../ducks/auth';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const TrainerCategories = ({ route }) => {
  const isSetting = route.params?.isSetting ?? false;
  const getSelectedCategories = useSelector(getTraineeCategoriesData);
  let ids = [];
  if (getSelectedCategories.length > 0) {
    ids = getSelectedCategories?.map(val => val.id);
  }
  const [selectedIds, setSelectedIds] = useState(ids);

  console.log(selectedIds);
  const dispatch = useDispatch();
  const _onPress = () => {
    // NavigationService.navigate('TrainerSessionType');
    const payloadApi = {
      categoryIds: '' + selectedIds,
    };
    dispatch(
      selectCategories.request({
        payloadApi,
        cb: () => {
          isSetting
            ? NavigationService.goBack()
            : NavigationService.navigate('TrainerSessionType');
        },
      }),
    );
    console.log('' + selectedIds);
  };
  const onSelectItem = id => {
    if (selectedIds.includes(id)) {
      let newData = selectedIds.filter(val => val !== id);
      setSelectedIds([...newData]);
    } else {
      selectedIds.push(id);
      setSelectedIds([...selectedIds]);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TrainingCategoryItem
        data={item}
        onPress={onSelectItem}
        isSelected={selectedIds.includes(item?.id)}
      />
    );
  };
  return (
    <>
      <Container headerTitle="Trainer Registration">
        <Text style={Styles.title}>Select Training Categories</Text>
        {/* <TrainingCategoriesList /> */}
        <FlatListApi
          showsVerticalScrollIndicator={false}
          actionType="GET_TRAINER_CATEGORY"
          selectorData={getIdentifierTrainer}
          requestAction={getTrainerCategories.request}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          identifier={'TRAINER_CATEGORY'}
        />
        {selectedIds.length > 0 && (
          <Button
            title={isSetting ? 'DONE' : 'Save & Continue'}
            largeButton
            onPress={_onPress}
          />
        )}
      </Container>
      <Loader type={'SELECT_TRAINER_CATEGORY'} />
    </>
  );
};

export default TrainerCategories;

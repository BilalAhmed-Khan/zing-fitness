import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Text,
  TrainingCategoriesList,
  Button,
  FlatListApi,
  TrainingCategoryItem,
  Loader,
  ButtonView,
  DatePicker,
  EmptyView,
} from '../../components';
import { UserUtill } from '../../dataUtils';
import {
  getIdentifierAuthData,
  getIdentifierTrainer,
  getTraineeCategoriesData,
  getTrainerCategories,
  getUserData,
  selectCategories,
} from '../../ducks/auth';
import {
  deleteTrainerBreakTimes,
  getTrainerBreakTimes,
  getTrainerBreakTimesData,
} from '../../ducks/trainer';
import { Colors, Images } from '../../theme';
import { NavigationService, Util } from '../../utils';

import { Styles } from './Styles';

const TrainerConfigureBreaks = ({ route }) => {
  const isSetting = route.params?.isSetting ?? false;
  const getUser = useSelector(getUserData);
  const dispatch = useDispatch();

  const onDeletePress = item => {
    const payloadApi = {
      id: item.id,
    };
    dispatch(
      deleteTrainerBreakTimes.request({
        payloadApi,
        cb: () => {},
      }),
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={Styles.container}>
        <View>
          <Text style={Styles.title}>{item.date}</Text>
          <Text style={Styles.subTitle}>
            {item?.fullDay === 0
              ? `${Util.convert24HrTo12(
                  item.startTime,
                )} - ${Util.convert24HrTo12(item.endTime)}`
              : 'Full Day'}
          </Text>
        </View>
        <ButtonView onPress={() => onDeletePress(item)}>
          <Image source={Images.trash} style={{ tintColor: Colors.primary }} />
        </ButtonView>
      </View>
    );
  };
  return (
    <>
      <Container headerTitle="Configure Breaks">
        <View style={Styles.titleView}>
          <Text style={Styles.uploadTitle}>{'ADD BREAKS'}</Text>
          <ButtonView
            onPress={() => NavigationService.navigate('AddConfigureBreaks')}
            style={Styles.addimageStyle}>
            <Image source={Images.addButton} />
          </ButtonView>
        </View>

        <FlatListApi
          showsVerticalScrollIndicator={false}
          actionType={getTrainerBreakTimes.type}
          selectorData={getTrainerBreakTimesData}
          requestAction={getTrainerBreakTimes.request}
          renderItem={renderItem}
          payload={{
            trainerId: UserUtill.id(getUser),
          }}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={
            <EmptyView text={'No Breaks, Add Breaks to see your breaks here'} />
          }
        />
      </Container>
      <Loader type={deleteTrainerBreakTimes.type} />
    </>
  );
};

export default TrainerConfigureBreaks;

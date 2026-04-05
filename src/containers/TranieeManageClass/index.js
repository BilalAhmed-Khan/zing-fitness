import React, { useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import {
  Container,
  Text,
  AppHeader,
  MyAppointmentsListItem,
  RadioButton,
  ButtonView,
  UserCalendarListitem,
  ClassListView,
  FlatListApi,
  Loader,
  EmptyView,
} from '../../components';
import Styles from './styles';
import { Colors, Images, Metrics } from '../../theme';
import { STATUS } from '../../config/Constants';
import { NavigationService } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRole } from '../../ducks/general';
import {
  deleteClases,
  getClasess,
  getIdentifierClassData,
} from '../../ducks/classes';
import { getUserData } from '../../ducks/auth';
import { UserUtill } from '../../dataUtils';
const TraineeManageClass = ({ route }) => {
  const isUser = route.params?.isUser ?? false;
  const id = route.params?.id ?? '';
  const trainerData = route.params?.trainerData ?? {};
  const isTrainee = useSelector(getUserRole);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  return (
    <Container
      style={Styles.container}
      contentStyle={{ paddingHorizontal: Metrics.smallMargin }}
      headerTitle={isUser ? 'Classes' : 'Manage My Classes'}
      notificationCount="9">
      {/* <View style={Styles.secMain}></View> */}

      {!isUser && (
        <View style={Styles.titleView}>
          <Text style={Styles.uploadTitle}>{'MY CLASSES'}</Text>
          <ButtonView
            onPress={() =>
              NavigationService.navigate('TranieeCreateClass', {
                // onPressCertification,
              })
            }
            style={Styles.addimageStyle}>
            <Image source={Images.addButton} />
          </ButtonView>
        </View>
      )}
      <FlatListApi
        showsVerticalScrollIndicator={false}
        actionType="GET_CLASESS"
        selectorData={getIdentifierClassData}
        requestAction={getClasess.request}
        renderItem={({ item }) => (
          <ClassListView
            props={item}
            onPress={() => {
              if (isUser) {
                NavigationService.navigate('UserSessionDetail', {
                  isSession: false,
                  id: item.id,
                  data: item,
                  trainerData: trainerData,
                });
              } else {
                NavigationService.navigate('TranieeCreateClass', {
                  isEdit: true,
                  data: item,
                });
              }
            }}
            onDeletePress={id => {
              dispatch(
                deleteClases.request({
                  payloadApi: { id },
                  cb: () => {},
                }),
              );
            }}
            isUser={isTrainee}
          />
        )}
        ListEmptyComponent={
          <EmptyView
            text={
              isTrainee
                ? 'No Classes, Add classes to see your classes here'
                : 'No Class Found'
            }
          />
        }
        payload={{ id: isUser ? id : UserUtill.id(userData) }}
        keyExtractor={item => `${item.id}`}
        identifier={'CLASESS'}
      />
      <Loader type={'DELETE_CLASES'} />
    </Container>
  );
};

export default TraineeManageClass;

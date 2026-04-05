import dayjs from 'dayjs';
import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';

import {
  Button,
  Container,
  Text,
  Map,
  ButtonView,
  ScrollViewApi,
  ImageView,
  Loader,
} from '../../components';
import { UserUtill } from '../../dataUtils';
import { createChatRoom } from '../../ducks/chat';
import {
  getTrainerIdentifierData,
  getTrainerListing,
  getTrainerProfile,
  getTrainerSession,
} from '../../ducks/trainer';

import { Images } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { Styles } from './Styles';

const UserTrainerProfile = ({ route }) => {
  const id = route.params?.id ?? '';
  const dispatch = useDispatch();
  const onPressBook = trainerData => {
    let currentDate = Util.formatDate(new Date(), 'YYYY-MM-DD');
    dispatch(
      getTrainerSession.request({
        payloadApi: { id: id },
        apiPayload: { date: currentDate },
        cb: data => {
          NavigationService.navigate('UserSessionDetail', {
            isSession: true,
            id: id,
            data: data,
            trainerData: trainerData,
          });
        },
      }),
    );
  };
  const ActionButton = ({ icon, onPress }) => (
    <ButtonView onPress={onPress}>
      <Image source={icon} style={Styles.icon} />
    </ButtonView>
  );
  const ActionButtons = () => (
    <View style={Styles.actionButton}>
      <ActionButton
        icon={Images.chat}
        onPress={() => {
          dispatch(
            createChatRoom.request({
              payloadApi: { userId: id },
              identifier: id,
              cb: data => {
                console.log('CALLBACK ==>', data);
                NavigationService.navigate('Chat', {
                  id: data.userId,
                  roomId: data?.roomId,
                });
              },
            }),
          );
          // NavigationService.navigate('Chat', {});
        }}
      />
      {/* <ActionButton
        icon={Images.share}
        onPress={() => {
          Util.onShare('Share', 'Share');
        }}
      /> */}
      {/* <ActionButton icon={Images.heart} /> */}
    </View>
  );
  const renderContent = data => {
    const categories = Util.getTrainerCategoreis(data?.trainerCategories ?? []);
    console.log('categories', categories);
    return (
      <View style={Styles.contentContainer}>
        <View style={Styles.avatarCotainer}>
          <ImageView
            source={{ uri: UserUtill.image(data) }}
            style={Styles.avatar}
            placeholderStyle={Styles.avatar}
            borderRadius={46}
          />
        </View>
        <Text style={Styles.username}>{UserUtill.name(data)}</Text>
        <Text style={Styles.trainerSkills}>{categories}</Text>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={UserUtill.rating(data)}
          size={13}
          isDisabled={true}
        />
        <View style={Styles.rowButtonView}>
          <ButtonView
            style={Styles.editProfileContainer}
            onPress={() => onPressBook(data)}>
            <Text style={Styles.editProfileText}>{'BOOK A SESSION'}</Text>
          </ButtonView>
          <ButtonView
            style={Styles.manageMyClassContainer}
            onPress={() => {
              NavigationService.navigate('TraineeManageClass', {
                isUser: true,
                id: UserUtill.id(data),
                trainerData: data,
              });
            }}>
            <Text style={Styles.editProfileText}>{'VIEW CLASSES'}</Text>
          </ButtonView>
        </View>
        <View style={Styles.mapStyle} pointerEvents="box-only">
          <Map
            latitude={UserUtill.lat(data)}
            longitude={UserUtill.long(data)}
          />
          <View style={Styles.locationIcon}>
            <Image source={Images.locationSetting} />
          </View>
        </View>
        <ActionButtons />
      </View>
    );
  };
  return (
    <Container headerTitle="Trainer Profile" notificationCount="2" chat>
      {/* <Content /> */}
      <ScrollViewApi
        // style={Styles.container}
        actionType="GET_TRAINER_PROFILE"
        requestAction={getTrainerProfile.request}
        identifier={id}
        selectorData={getTrainerIdentifierData}
        payload={{ id: id }}
        content={renderContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
      <Loader type={['GET_TRAINER_SESSION']} />
    </Container>
  );
};

export default UserTrainerProfile;

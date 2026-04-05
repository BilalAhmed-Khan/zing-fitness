import React from 'react';
import {
  Container,
  FlatListApi,
  ImageView,
  Text,
  UserCalendarListitem,
} from '../../components';
import { AppHeader } from '../../components';
import { View, Image, Pressable, FlatList, Platform } from 'react-native';
import MyTrainerListItem from '../../components/FavoriteTrainerListItem/FavoriteTrainerListItem';
import Styles from './Styles';
import { NavigationService } from '../../utils';
import { UserUtill } from '../../dataUtils';
import { useSelector } from 'react-redux';
import { getUserData } from '../../ducks/auth';
import TopTabs from '../../components/TopTabs';
import {
  ProfileTabs,
  BOOKING_SESSION_TYPE,
  BOOKING_STATUS,
} from '../../config/Constants';
import { Colors } from '../../theme';
import {
  faviouriteTrainers,
  getTrainerIdentifierData,
  getTrainerIdentifierListingData,
  myTrainers,
} from '../../ducks/trainer';
import { bookingListing, getbookingIdentifierData } from '../../ducks/booking';
import { getUserRole } from '../../ducks/general';

const MyTrainerList = React.memo(
  () => {
    return (
      <FlatListApi
        style={{ paddingTop: 10, backgroundColor: Colors.secondary }}
        showsVerticalScrollIndicator={false}
        actionType="GET_FAVIOURITE_TRAIENRS"
        selectorData={getTrainerIdentifierListingData}
        contentContainerStyle={{
          paddingBottom: Platform.select({ ios: 70, android: 90 }),
        }}
        requestAction={faviouriteTrainers.request}
        renderItem={({ item }) => (
          <MyTrainerListItem
            // for BOoking history screen
            props={item}
            onPress={item => {
              NavigationService.navigate('UserTrainerProfile', {
                id: UserUtill.id(item),
              });
            }}
            // isSimpleView
          />
        )}
        keyExtractor={item => `${item.id}`}
        identifier={'MY_TRAIENRS'}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.image === nextProps.image;
  },
);

const FavoriteTrainerList = React.memo(
  () => {
    const isTrainee = useSelector(getUserRole);
    return (
      <FlatListApi
        // style={{ marginTop: 10 }}
        // containerStyle={{ marginTop: 10 }}
        style={{ paddingTop: 10, backgroundColor: Colors.secondary }}
        contentContainerStyle={{
          paddingBottom: Platform.select({ ios: 70, android: 90 }),
        }}
        showsVerticalScrollIndicator={false}
        actionType="BOOKING_LISTING"
        selectorData={getbookingIdentifierData}
        requestAction={bookingListing.request}
        renderItem={({ item }) => (
          <UserCalendarListitem
            // for BOoking history screen
            props={item}
            isTrainee={isTrainee}
            onPress={item => {
              NavigationService.navigate('TrainerSessionDetail', {
                isSession: item?.bookingType !== BOOKING_SESSION_TYPE.CLASS,
                id: item?.id ?? '',
              });
            }}
            onButtonPress={item => {
              let isSession = item?.bookingType !== BOOKING_SESSION_TYPE.CLASS;
              let isCheckStatus =
                item.status === BOOKING_STATUS.PENDING ||
                item.status === BOOKING_STATUS.TRAINER_ACCEPTED;
              if (isCheckStatus && item.canCancel) {
                NavigationService.navigate('TrainerSessionCancel', {
                  isSession: isSession,
                  sessionData: item,
                });
              }
            }}
            // isSimpleView
          />
        )}
        keyExtractor={item => `${item.id}`}
        identifier={'BOOKING'}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.identifier === nextProps.identifier;
  },
);

const UserMyProfile = () => {
  const userData = useSelector(getUserData);
  const isTrainee = useSelector(getUserRole);
  const _onPressEditProfile = () => {
    NavigationService.navigate('UserSettings');
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'scheduledSession':
        return <FavoriteTrainerList />;
      case 'myTrainers':
        return <MyTrainerList />;
      default:
        return null;
    }
  };

  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );
  const ImageUsernameUserID = () => (
    <View style={Styles.childContainer}>
      <View style={Styles.ImageView}>
        <ImageView
          source={{ uri: UserUtill.image(userData) }}
          style={Styles.imageStyle}
          borderRadius={8}
          placeholderStyle={Styles.imageStyle}
        />
      </View>
      <View style={Styles.nameUserID}>
        <Text style={Styles.username}>{UserUtill.name(userData)}</Text>
        <Text style={Styles.userid}>{`@${UserUtill.fullNameLowerCase(
          userData,
        )}`}</Text>
      </View>
    </View>
  );
  const EditProfileButton = () => (
    <Pressable
      style={Styles.editProfileContainer}
      onPress={_onPressEditProfile}>
      <Text style={Styles.editProfileText}>MY PROFILE</Text>
    </Pressable>
  );

  return (
    <Container style={Styles.container}>
      <AppHeader notificationCount="9" />
      <View style={Styles.secMain}>
        <ImageUsernameUserID />
        <EditProfileButton />
        <Line />
        <TopTabs
          tabData={ProfileTabs}
          renderScene={renderScene}
          tabIndicatorColor={Colors.primary}
          indicatorContainerStyleCustom={{ backgroundColor: Colors.secondary }}
        />
        {/* <AppoinmentsTrainer />
        <FavoriteTrainerList /> */}
      </View>
    </Container>
  );
};

export default UserMyProfile;

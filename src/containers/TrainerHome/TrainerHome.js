import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Image, Pressable, FlatList, Platform } from 'react-native';
import {
  Container,
  Text,
  AppHeader,
  MyAppointmentsListItem,
  RadioButton,
  ButtonView,
  UserCalendarListitem,
  ImageView,
  FlatListApi,
} from '../../components';
import Styles from './Styles';
import { Colors, Images, Metrics } from '../../theme';
import {
  BOOKING_SESSION_TYPE,
  BOOKING_STATUS,
  STATUS,
  TrainerHomeTabs,
} from '../../config/Constants';
import { LocationUtil, NavigationService, Util } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  authEditProfile,
  getUserData,
  updateLocation,
  userCurrentLocation,
} from '../../ducks/auth';
import { UserUtill } from '../../dataUtils';
import TopTabs from '../../components/TopTabs';
import {
  getTrainerIdentifierListingData,
  myTrainers,
} from '../../ducks/trainer';
import { bookingListing, getbookingIdentifierData } from '../../ducks/booking';
import { getUserRole } from '../../ducks/general';
import { connectAction } from '../../ducks/chat';
import { disconnect } from '../../utils/SocketUtil';

const UserImage = React.memo(
  ({ image }) => {
    return (
      <View style={Styles.ImageView}>
        {/* <ImageView
          source={{ uri: image }}
          style={Styles.imageStyle}
          borderRadius={8}
        /> */}
        {image === '' ? (
          <ImageView
            source={{ uri: image }}
            style={Styles.imageStyle}
            placeholderStyle={Styles.imageStyle}
            borderRadius={8}
          />
        ) : (
          <Image source={{ uri: image }} style={Styles.imageStyle} />
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.image === nextProps.image;
  },
);

const MyTraineesView = React.memo(
  () => {
    return (
      <FlatListApi
        style={{
          paddingTop: 10,
          backgroundColor: Colors.secondary,
        }}
        contentContainerStyle={{
          paddingBottom: Platform.select({ ios: 70, android: 90 }),
        }}
        showsVerticalScrollIndicator={false}
        actionType="GET_MY_TRAIENRS"
        selectorData={getTrainerIdentifierListingData}
        requestAction={myTrainers.request}
        renderItem={({ item }) => <MyAppointmentsListItem props={item} />}
        keyExtractor={item => `${item.id}`}
        identifier={'MY_TRAINEES'}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.image === nextProps.image;
  },
);

const MyAppointments = React.memo(
  () => {
    const onPressSession = item => {
      let isSession = item?.bookingType !== BOOKING_SESSION_TYPE.CLASS;
      let isCheckStatus =
        item.status === BOOKING_STATUS.PENDING ||
        item.status === BOOKING_STATUS.TRAINER_ACCEPTED;
      if (isCheckStatus && item.canCancel) {
        NavigationService.navigate('TrainerSessionCancel', {
          isSession: isSession,
          sessionData: item,
        });
      } else {
        Util.showMessage('Your booking is started so you can not cancel it');
      }
    };
    const isTrainee = useSelector(getUserRole);
    return (
      <FlatListApi
        style={{
          paddingTop: 10,
          backgroundColor: Colors.secondary,
        }}
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
            onButtonPress={item => onPressSession(item)}
            // isSimpleView
          />
        )}
        keyExtractor={item => `${item.id}`}
        identifier={'BOOKING'}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.image === nextProps.image;
  },
);

const TrainerHome = () => {
  const trainerData = useSelector(getUserData);
  const isTrainee = useSelector(getUserRole);
  const timer = useRef(null);

  const [isOnline, setIsOnline] = useState(UserUtill.isOnline(trainerData));
  const dispatch = useDispatch();
  // console.log(trainerData);
  // useEffect(() => {
  //   setTimeout(() => {
  //     DataHandler.getTraineAlertModal().show({});
  //   }, 1000);
  // }, []);

  useEffect(() => {
    dispatch(connectAction());
    if (Util.isPlatformIOS()) {
      setTimeout(() => {
        LocationUtil.getTransperacyPermission();
      }, 1000);
    }
    return () => {
      disconnect();
    };
  }, []);

  const getLocation = () => {
    LocationUtil.getCurrentLocation(LocationObj => {
      const data = {
        cordinates: [LocationObj.lng, LocationObj.lat],
        address: LocationObj.address,
      };
      dispatch(userCurrentLocation({ data }));
      dispatch(
        updateLocation.request({
          payloadApi: {
            location: {
              cordinates: data.cordinates,
            },
          },
          id: UserUtill.id(trainerData),
        }),
      );
    });
  };
  useEffect(() => {
    let verificationTime = 1;
    timer.current = setInterval(() => {
      if (verificationTime <= 0) {
        verificationTime = 60;
        getLocation();
      } else {
        verificationTime = verificationTime - 1;
      }
    }, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  const ImageUsernameUserID = () => (
    <View style={Styles.childContainer}>
      <UserImage image={UserUtill.image(trainerData)} />
      <View style={Styles.nameUserID}>
        <View style={Styles.textView}>
          <Text style={Styles.username}>{UserUtill.name(trainerData)}</Text>
          <Text style={Styles.userid}>{`@${UserUtill.fullNameLowerCase(
            trainerData,
          )}`}</Text>
          <RadioButton
            buttons={STATUS}
            style={Styles.radioStyle}
            buttonStyle={Styles.radioButoonStyle}
            buttonTextStyle={Styles.radioButoonTextStyle}
            isOnline={isOnline}
            onButtonPress={(flag, sucess) => {
              setIsOnline(!isOnline);
              dispatch(
                authEditProfile.request({
                  payloadApi: {
                    isOnline: flag,
                  },
                  id: UserUtill.id(trainerData),
                  cb: sucess,
                  faliure: () => {
                    console.log('faliure', flag);
                    setIsOnline(!flag);
                  },
                }),
              );
            }}
          />
        </View>
        {UserUtill.isFeatured(trainerData) && (
          <Image source={Images.kingIcon} style={Styles.kingIcon} />
        )}
      </View>
    </View>
  );

  const EditProfileButton = () => (
    <View style={Styles.rowButtonView}>
      <ButtonView
        style={Styles.manageMyClassContainer}
        onPress={() => {
          NavigationService.navigate('TraineeManageClass');
        }}>
        <Text style={Styles.editProfileText}>{'MANAGE MY CLASSES'}</Text>
      </ButtonView>
      <ButtonView
        style={Styles.editProfileContainer}
        onPress={() => {
          // dispatch(
          //   authGetProfile.request({
          //     payloadApi: {
          //       id: trainerData.id,
          //     },
          //     cb: () => {
          NavigationService.navigate('TrainerEditProfile');
          //     },
          //   }),
          // );
        }}>
        <Text style={Styles.editProfileText}>{'EDIT PROFILE'}</Text>
      </ButtonView>
    </View>
  );
  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );

  const renderScene = ({ route }) => {
    console.log(route);
    switch (route.key) {
      case 'myAppointments':
        return <MyAppointments />;
      case 'myTrainees':
        return <MyTraineesView />;
      default:
        return null;
    }
  };

  return (
    <Container style={Styles.container} showBar={true}>
      <>
        <AppHeader chat={false} notificationCount="9" />
        <View style={Styles.secMain}>
          <ImageUsernameUserID />
          <EditProfileButton />
          <Line />
          <TopTabs
            tabData={TrainerHomeTabs}
            renderScene={renderScene}
            tabIndicatorColor={Colors.primary}
            indicatorContainerStyleCustom={{
              backgroundColor: Colors.secondary,
            }}
          />
        </View>
      </>
    </Container>
  );
};

export default TrainerHome;

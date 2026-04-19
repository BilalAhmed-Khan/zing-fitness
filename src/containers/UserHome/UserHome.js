import React, { useEffect, useRef } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Text,
  AppHeader,
  SearchInput,
  FeaturedTrainerListItem,
  NearbyTrainerListItem,
  ButtonView,
  ScrollViewApi,
  Loader,
  EmptyView,
} from '../../components';
import { UserUtill } from '../../dataUtils';
import {
  authEditProfile,
  getTrainerCategories,
  getUserData,
  updateLocation,
  userCurrentLocation,
} from '../../ducks/auth';
import { connectAction } from '../../ducks/chat';
import { getDashboard, getDashboardData } from '../../ducks/dashboard';
import { getSetting } from '../../ducks/general';
import { getTrainerListing } from '../../ducks/trainer';
import { Metrics } from '../../theme';
import { LocationUtil, NavigationService, SocketUtil, Util } from '../../utils';
import { disconnect } from '../../utils/SocketUtil';

import Styles from './Styles';

const UserHome = () => {
  const dispatch = useDispatch();
  const getUser = useSelector(getUserData);
  const timer = useRef(null);

  useEffect(() => {
    dispatch(connectAction());
    dispatch(
      getTrainerCategories.request({
        payloadApi: {},
        cb: data => {},
        identifier: 'TRAINER_CATEGORY',
        reset: true,
      }),
    );
    dispatch(
      getSetting.request({
        payloadApi: {},
        cb: data => {},
      }),
    );
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
            address: data.address,
          },
          id: UserUtill.id(getUser),
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

  const FeaturedTrainers = ({ data }) => (
    <View>
      {data.length > 0 && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={Styles.Heading}>Featured Trainers</Text>
          {data.length >= 2 ? (
            <ButtonView
              onPress={() => {
                NavigationService.navigate('FeaturedTrainer', {
                  isNearBy: false,
                });
              }}>
              <Text style={Styles.viewAllText}>{'View All'}</Text>
            </ButtonView>
          ) : (
            <></>
          )}
        </View>
      )}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={Styles.FeaturedTrainerContainer}
        renderItem={({ item }) => <FeaturedTrainerListItem props={item} />}
      />
    </View>
  );

  const NearbyTrainers = ({ data }) => (
    <View>
      {data.length > 0 && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={Styles.NearbyTrain}>Nearby Trainers</Text>
          {data.length >= 2 ? (
            <ButtonView
              onPress={() => {
                NavigationService.navigate('FeaturedTrainer', {
                  isNearBy: true,
                });
              }}>
              <Text style={Styles.viewAllText}>{'View All'}</Text>
            </ButtonView>
          ) : (
            <></>
          )}
        </View>
      )}
      <FlatList
        data={data}
        renderItem={({ item }) => <NearbyTrainerListItem props={item} />}
      />
    </View>
  );
  const renderContent = data => {
    console.log('DATA ===>', data);

    if (
      data?.featuredTrainers.length === 0 &&
      data?.nearbyTrainers.length === 0
    ) {
      return (
        <View style={{ height: Metrics.height * 0.6 }}>
          <EmptyView text={'No Trainer Found'} />
        </View>
      );
    }

    return (
      <>
        <FeaturedTrainers data={data?.featuredTrainers ?? []} />
        <NearbyTrainers data={data?.nearbyTrainers ?? []} />
      </>
    );
  };
  return (
    <Container style={Styles.container}>
      <AppHeader notificationCount="9" />
      <View style={Styles.secMain}>
        <ButtonView
          onPress={() => {
            dispatch(
              getTrainerListing.request({
                payloadApi: {
                  nearbyTrainers: true,
                },
                cb: item => {
                  console.log('Item ===>', item);
                  NavigationService.navigate('UserSearch', {
                    data: item ?? [],
                  });
                },
              }),
            );
          }}>
          <View pointerEvents="none" style={Styles.SearchView}>
            {/* <SearchInput isFilter /> */}
            <Text style={Styles.SearchText}>{'Filter Trainer'}</Text>
          </View>
        </ButtonView>
        <ScrollViewApi
          // style={Styles.container}
          contentContainerStyle={{ paddingBottom: Metrics.ratio(80) }}
          actionType="GET_DASHBOARD"
          requestAction={getDashboard.request}
          selectorData={getDashboardData}
          content={renderContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
      <Loader type={['GET_TRAINER_LISTING']} />
    </Container>
  );
};

export default UserHome;

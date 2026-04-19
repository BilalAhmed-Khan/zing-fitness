import React, { useEffect, useMemo } from 'react';
import { View, FlatList, Image, Pressable } from 'react-native';
import {
  AppHeader,
  Container,
  SearchInput,
  Map,
  Text,
  Button,
  ImageView,
  Loader,
  ButtonView,
} from '../../components';
import Lottie from 'lottie-react-native';
import { Colors, Images, Metrics } from '../../theme';
import { DataHandler, NavigationService, Util } from '../../utils';
import { normalizeStripeBookingPayment } from '../../utils/StripePaymentUtil';

import { Styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { UserUtill } from '../../dataUtils';
import {
  createRealBookingIntent,
  getbookingIdentifierBookingData,
  gettrainerFlag,
  trainerAccept,
} from '../../ducks/booking';
import CountDown from 'react-native-countdown-component';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import { createChatRoom } from '../../ducks/chat';
import {
  getTrainerListing,
  getTrainerIdentifierListingData,
} from '../../ducks/trainer';
import { getRequestFlag } from '../../ducks/requestFlags';

const NEARBY_TRAINERS_MAP_ID = 'SEARCH_TRAINER_NEARBY';

const trainers = [
  {
    trainerName: 'Rodney Artichoke',
    trainingType: 'Strength Training',
    likes: 1105,
    imageLink: 'https://bit.ly/3Irpboz',
  },
  {
    trainerName: 'Rodney Artichoke',
    trainingType: 'Strength Training',
    likes: 1105,
    imageLink: 'https://bit.ly/3Irpboz',
  },
  {
    trainerName: 'Rodney Artichoke',
    trainingType: 'Strength Training',
    likes: 1105,
    imageLink: 'https://bit.ly/3Irpboz',
  },
];

const SearchTrainer = ({ route }) => {
  const payloadData = route.params?.payloadData ?? false;
  const trainerFlag = useSelector(gettrainerFlag);
  const bookingData = useSelector(getbookingIdentifierBookingData(trainerFlag));
  const nearbyTrainers = useSelector(
    getTrainerIdentifierListingData(NEARBY_TRAINERS_MAP_ID),
  );
  const listingRequest = useSelector(
    getRequestFlag(`GET_TRAINER_LISTING_${NEARBY_TRAINERS_MAP_ID}`),
  );
  const dispatch = useDispatch();
  console.log('trainerFlag', trainerFlag, bookingData);

  const sessionLat = UserUtill.lat(payloadData);
  const sessionLng = UserUtill.long(payloadData);

  const trainerMarkers = useMemo(() => {
    if (!Array.isArray(nearbyTrainers) || nearbyTrainers.length === 0) {
      return [];
    }
    const trainerDisplayName = t => {
      const fromFull = UserUtill.name(t);
      if (fromFull && String(fromFull).trim() !== '') {
        return String(fromFull).trim();
      }
      const parts = [t.firstName, t.lastName]
        .filter(Boolean)
        .map(s => String(s).trim());
      return parts.join(' ').trim();
    };
    return nearbyTrainers
      .map(t => {
        const rawLat = t.currentLatitude ?? t.location?.cordinates?.[1];
        const rawLng = t.currentLongitude ?? t.location?.cordinates?.[0];
        const latitude =
          typeof rawLat === 'string' ? parseFloat(rawLat) : rawLat;
        const longitude =
          typeof rawLng === 'string' ? parseFloat(rawLng) : rawLng;
        return {
          id: UserUtill.id(t) || `${latitude}-${longitude}`,
          latitude,
          longitude,
          title: trainerDisplayName(t),
        };
      })
      .filter(
        m =>
          typeof m.latitude === 'number' &&
          !Number.isNaN(m.latitude) &&
          typeof m.longitude === 'number' &&
          !Number.isNaN(m.longitude) &&
          m.latitude !== -1 &&
          m.longitude !== -1,
      );
  }, [nearbyTrainers]);

  useEffect(() => {
    if (sessionLat === -1 || sessionLng === -1) {
      return;
    }
    dispatch(
      getTrainerListing.request({
        payloadApi: {
          nearbyTrainers: true,
          search: '',
          latitude: sessionLat,
          longitude: sessionLng,
        },
        identifier: NEARBY_TRAINERS_MAP_ID,
        reset: true,
      }),
    );
  }, [dispatch, sessionLat, sessionLng]);

  useEffect(() => {
    return () => {
      dispatch(trainerAccept({ id: '' }));
    };
  }, [dispatch]);

  const sucessModal = () => {
    setTimeout(() => {
      DataHandler.getSessionCompleteModal().show({
        discription: 'Your Session Booking Has Been Created',
        onPress: () => {
          NavigationService.reset('UserApp');
        },
      });
    }, 300);
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);
      Util.showMessage(error.message);
    } else {
      sucessModal();
    }
  };

  const initializePaymentSheet = async data => {
    const initParams = {
      merchantDisplayName: 'Zing.',
      paymentIntentClientSecret: data.clientSecret,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    };
    if (data.customerId && data.ephemeralsecret) {
      initParams.customerId = data.customerId;
      initParams.customerEphemeralKeySecret = data.ephemeralsecret;
    }
    const { error } = await initPaymentSheet(initParams);
    if (error) {
      console.log(error);
      Util.showMessage(error.message);
      return;
    }
    setTimeout(() => {
      openPaymentSheet();
    }, 300);
  };

  const openPayment = data => {
    console.log('openPayment ===>', data);

    const stripe = normalizeStripeBookingPayment(data);
    if (!stripe.clientSecret) {
      Util.showMessage(
        'Payment could not be started. Please try again or contact support.',
      );
      return;
    }
    const paymentData = {
      ephemeralsecret: stripe.ephemeralSecret,
      clientSecret: stripe.clientSecret,
      customerId: stripe.customerId,
    };
    console.log(paymentData);

    initializePaymentSheet(paymentData);
  };

  const onPressTrainerItem = () => {
    NavigationService.navigate('UserTrainerProfile');
  };
  const Likes = ({ likes }) => (
    <View style={Styles.like}>
      <Image source={Images.heartRed} />
      <Text style={Styles.likesCount}>{likes}</Text>
    </View>
  );
  const VerticalLine = () => <View style={Styles.verticalLine} />;
  const TrainerActionButtons = ({ data }) => (
    <View style={Styles.trainerActionButtonsContainer}>
      <Pressable>
        <Image source={Images.calendar} />
      </Pressable>
      <VerticalLine />
      <ButtonView
        onPress={() => {
          dispatch(
            createChatRoom.request({
              payloadApi: { userId: UserUtill.id(data) },
              identifier: UserUtill.id(data),
              cb: callbackData => {
                console.log('CALLBACK ==>', callbackData);
                NavigationService.navigate('Chat', {
                  id: callbackData.userId,
                  roomId: callbackData?.roomId,
                });
              },
            }),
          );
        }}>
        <Image source={Images.chat} />
      </ButtonView>
      <VerticalLine />
      <Pressable>
        <Image source={Images.heart} />
      </Pressable>
    </View>
  );
  const TrainerItem = ({ item }) => {
    return (
      <Pressable
        style={Styles.trainerItemContainer}
        onPress={onPressTrainerItem}>
        <Image source={{ uri: item.imageLink }} style={Styles.trainerAvatar} />
        <View style={Styles.trainerItemContent}>
          <Likes likes={item.likes} />
          <Text style={Styles.trainerName}>{item.trainerName}</Text>
          <Text style={Styles.trainerType}>{item.trainingType}</Text>
          <TrainerActionButtons data={item} />
        </View>
      </Pressable>
    );
  };

  const TrainersList = () => (
    <FlatList
      style={Styles.trainerList}
      horizontal
      data={trainers}
      renderItem={TrainerItem}
    />
  );

  const SearchBox = () => {
    return (
      <View style={{ position: 'absolute', top: 20 }}>
        <View style={[Styles.fullBox, { alignSelf: 'center' }]}>
          <Text style={Styles.timeFull}>{UserUtill.address(payloadData)}</Text>
          <View>
            <Image source={Images.locationPin} />
          </View>
        </View>
      </View>
    );
  };
  const LocationImage = () => {
    return (
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: Metrics.height / 2.6,
        }}>
        <Image source={Images.locationSetting} />
      </View>
    );
  };
  const showSearchingOverlay =
    trainerFlag === '' && listingRequest.loading && trainerMarkers.length === 0;

  const mapContent = () => (
    <>
      <View style={Styles.mapContent}>
        {showSearchingOverlay ? (
          <>
            <Lottie
              source={Images.locationLottie}
              autoPlay
              loop
              style={{ width: 160, height: 160 }}
            />
            <LocationImage />
          </>
        ) : null}
      </View>
    </>
  );

  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );

  const trainerView = () => {
    return (
      <View
        style={{
          height: 350,
          width: Metrics.width - 30,
          position: 'absolute',
          bottom: 0,
          backgroundColor: Colors.secondary,
          marginHorizontal: 15,
          borderWidth: 1,
          borderColor: Colors.greyborder,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          justifyContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <CountDown
            until={120}
            // size={20}
            onFinish={() => {
              NavigationService.reset('UserApp');
            }}
            digitStyle={Styles.countdigitStyle}
            digitTxtStyle={Styles.countdigitTxtStyle}
            timeToShow={['M', 'S']}
            timeLabels={{ h: null, m: null, s: null }}
            showSeparator
            separatorStyle={{ color: Colors.white }}
          />
          <Text style={Styles.loactionHeading}>
            {'Time Left to Pay Trainer'}
          </Text>
        </View>
        <Line />
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ImageView
              source={{ uri: UserUtill.image(bookingData?.trainer) }}
              style={{ width: 62, height: 62, borderRadius: 62 / 2 }}
              placeholderStyle={{ width: 62, height: 62, borderRadius: 62 / 2 }}
              borderRadius={62 / 2}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                marginLeft: 10,
              }}>
              <View style={{}}>
                <Text style={Styles.trainerName}>
                  {UserUtill.name(bookingData?.trainer)}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={Styles.tagView}>
                    <Text style={Styles.tagViewText}>{'SESSION'}</Text>
                  </View>
                  <Text style={Styles.typeStyle}>
                    {bookingData?.category?.title ?? ''}
                  </Text>
                </View>

                <Text style={Styles.loactionHeading}>
                  {'Estimated Reach Time: 30 Mins'}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={Styles.priceText}>{`$${
                  bookingData?.amount ?? 0
                }`}</Text>
                <Text style={Styles.trainerminiName}>{`/${
                  bookingData?.duration ?? 30
                }min`}</Text>
              </View>
            </View>
          </View>
          <Line />
          {/* <Text style={Styles.loactionHeading}>{'Location:'}</Text>
          <View style={Styles.fullBox2}>
            <View style={{ alignItems: 'center' }}>
              <Image source={Images.locationPin} style={{ marginRight: 10 }} />
            </View>
            <Text style={Styles.otherText}>
              {UserUtill.address(bookingData?.trainer)}
            </Text>
          </View>
          <Line /> */}
          <Text style={Styles.descText}>
            You will need to pay the booking amount in 60 seconds or else the
            booking will be cancelled automatically.
          </Text>
          <Button
            title="PAY NOW"
            disabled={trainerAccept === ''}
            onPress={() => {
              // dispatch(
              //   createRealBookingIntent.request({
              //     payloadApi: { id: bookingData.id },
              //     cb: openPayment,
              //   }),
              // );

              NavigationService.replace('UserTrainerSchedule', {
                isSession: true,
                id: bookingData?.id,
                data: bookingData,
                trainerData: bookingData?.trainer,
                isRealTime: true,
              });
            }}
          />
        </View>
      </View>
    );
  };

  // const Content = () => (

  // );

  return (
    <Container>
      <AppHeader
        hideLogo
        style={Styles.header}
        notificationCount="2"
        title="Finding Trainer"
        showBack
      />
      <View style={Styles.content}>
        <Map
          latitude={UserUtill.lat(payloadData)}
          longitude={UserUtill.long(payloadData)}
          markers={trainerMarkers}
        />
        <SearchBox />
        {trainerFlag === '' ? mapContent() : trainerView()}
      </View>
      <Loader
        type={[
          'CREATE_BOOKING_INTENT',
          `GET_TRAINER_LISTING_${NEARBY_TRAINERS_MAP_ID}`,
        ]}
      />
    </Container>
  );
};

export default SearchTrainer;

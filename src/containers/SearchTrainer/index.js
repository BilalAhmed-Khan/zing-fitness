import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
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
import { getUserData } from '../../ducks/auth';
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
  const animationProgress = useRef(new Animated.Value(0));
  const payloadData = route.params?.payloadData ?? false;
  const [isLoading, setisLoading] = useState(true);
  const userData = useSelector(getUserData);
  const trainerFlag = useSelector(gettrainerFlag);
  const bookingData = useSelector(getbookingIdentifierBookingData(trainerFlag));
  const dispatch = useDispatch();
  console.log('trainerFlag', trainerFlag, bookingData);

  useEffect(() => {
    if (trainerFlag === '') {
      if (isLoading) {
        Animated.timing(animationProgress.current, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: false,
          onComplete: () => {
            console.log('asdasdasd');
            setisLoading(false);
            animationProgress.current.setValue(0);
          },
        }).start();
      } else {
        setisLoading(true);
      }
    }
    return () => {
      // dispatch(trainerAccept({ id: '' }));
    };
  }, [isLoading]);

  useEffect(() => {
    return () => {
      dispatch(trainerAccept({ id: '' }));
    };
  }, []);

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
  const mapContent = () => (
    <>
      <View style={Styles.mapContent}>
        {/* <TrainersList /> */}
        <Lottie
          // style={{ backgroundColor: Colors.white }}
          source={Images.locationLottie}
          progress={animationProgress.current}
          loop={true}
        />
        <LocationImage />
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
          <Text
            style={
              Styles.descText
            }>{`You will need to pay the booking amount in 60 seconds or else the booking will be cancelled automatically.`}</Text>
          <Button
            title={'PAY NOW'}
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
        />
        <SearchBox />
        {trainerFlag === '' ? mapContent() : trainerView()}
      </View>
      <Loader type={['CREATE_BOOKING_INTENT']} />
    </Container>
  );
};

export default SearchTrainer;

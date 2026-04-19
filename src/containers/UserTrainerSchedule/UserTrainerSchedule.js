import {
  useApplePay,
  useGooglePay,
  useStripe,
} from '@stripe/stripe-react-native';
import React from 'react';
import { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Container,
  Text,
  HorizontalCalendar,
  TimeSelector,
  PaymentMethods,
  ButtonView,
  ScrollViewApi,
  ImageView,
  Loader,
  Dropdown,
} from '../../components';
import _ from 'lodash';

import {
  PAYMENT_METHODS,
  PAYMENT_METHODS_ANDROID,
  PAYMENT_TYPE,
  WEEKS,
} from '../../config/Constants';
import { ClassUtill, SessionUtill, UserUtill } from '../../dataUtils';
import { getUserData } from '../../ducks/auth';
import {
  getSessionIdentifierData,
  getTrainerSession,
} from '../../ducks/trainer';
import { Colors, Images, Metrics } from '../../theme';
import { DataHandler, NavigationService, Util } from '../../utils';
import { normalizeStripeBookingPayment } from '../../utils/StripePaymentUtil';

import { Styles } from './Styles';
import { s } from 'react-native-size-matters';
import {
  bookClass,
  bookSession,
  createRealBookingIntent,
  deleteParticipants,
} from '../../ducks/booking';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import {
  applePayRequestConfig,
  googlePayRequestConfig,
} from '../../config/PaymentConfig';
import dayjs from 'dayjs';

const markedDateStyle = {
  dateContainerStyle: { backgroundColor: Colors.primary },
};

const UserTrainerSchedule = ({ route }) => {
  const isSession = route.params?.isSession ?? false;
  const id = route.params?.id ?? '';
  const trainerData = route.params?.trainerData ?? {};
  const isRealTime = route.params?.isRealTime ?? false;
  const data = isRealTime
    ? route.params?.data
    : useSelector(getSessionIdentifierData(id)) ?? {};
  const authUser = useSelector(getUserData);
  const [markedDates, setMarkedDates] = useState([]);
  const [customDatesStyles, setCustomDateStyles] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participantsData, setParticipantsData] = useState([]);
  const [cordinates, setCordinates] = useState(SessionUtill.location(data));
  const [address, setAddress] = useState(SessionUtill.address(data));
  const dispatch = useDispatch();

  const [formObj, categoriesProps] = useHookForm(
    ['categoryId'],
    isRealTime
      ? {
          categoryId: data.categoryId,
        }
      : {},
    ValidationSchema.bookSession,
  );

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

  const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay();

  const {
    initGooglePay,
    presentGooglePay,
    isGooglePaySupported,
  } = useGooglePay();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const _processApplePay = async (clientSecret, payData) => {
    if (!(await isApplePaySupported)) {
      Util.showMessage('Apple Pay is not supported.');
      return;
    }
    console.log('payData ==>', payData);
    // console.log('Data ==>', data);
    const cartItems = [
      {
        label: 'Zing Fitness',
        amount: `${payData.amount / 100}`,
        paymentType: 'Immediate',
      },
    ];
    console.log('cartItems', cartItems);
    const { error } = await presentApplePay({
      cartItems: cartItems,
      country: applePayRequestConfig.country,
      currency: applePayRequestConfig.currency,
      merchantName: 'merchant.app.zingfitness',
    });
    if (error) {
      Util.showMessage(error.message);
    } else {
      try {
        const response = await confirmApplePayPayment(clientSecret);
        const { error: confirmError } = response;
        if (confirmError) {
          Util.showMessage(`${confirmError}!`);
        } else {
          sucessModal();
        }
      } catch (err) {
        console.log(err, 'err');
      }
    }
  };

  const initializeGooglePlay = async data => {
    try {
      const { error } = await initGooglePay({
        testEnv: googlePayRequestConfig.testEnv,
        merchantName: googlePayRequestConfig.merchantName,
        countryCode: googlePayRequestConfig.countryCode,
        billingAddressConfig: googlePayRequestConfig.billingAddressConfig,
        existingPaymentMethodRequired: false,
        isEmailRequired: false,
      });
      if (error) {
        Util.showMessage(error.message);
        return;
      }
      _processGooglePay(data.clientSecret);
    } catch (err) {
      console.log(err, 'err');
      Util.showMessage('Unable to initialize Google Pay.');
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

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);
      Util.showMessage(error.message);
    } else {
      sucessModal();
    }
  };

  const _processGooglePay = async (clientSecret, paymentIntentId) => {
    if (!(await isGooglePaySupported({ testEnv: googlePayRequestConfig.testEnv }))) {
      Util.showMessage('Google Pay is not supported.');
      return;
    }
    const { error } = await presentGooglePay({
      clientSecret,
      forSetupIntent: false,
    });
    if (error) {
      Util.showMessage(error.message);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    } else {
      sucessModal();
    }
  };

  const onDateSelected = (selectedDate, data) => {
    let day = _.lowerCase(selectedDate.format('dddd'));
    let availableDateData = data?.availableDateTime ?? [];
    let slotsData;
    for (let i = 0; i < availableDateData.length; i++) {
      if (availableDateData[i].day === day) {
        slotsData = availableDateData[i].slots;
      }
    }
    const _customDatesStyles = {
      startDate: selectedDate,
      ...markedDateStyle,
    };
    setMarkedDates([selectedDate]);
    setCustomDateStyles([_customDatesStyles]);
    if (slotsData?.length > 0) {
      setSlots([...slotsData]);
    } else {
      setSlots([]);
      setSelectedTime('');
    }
  };

  const CallDateApi = selectedDate => {
    let day = selectedDate.format('YYYY-MM-DD');
    dispatch(
      getTrainerSession.request({
        payloadApi: { id: id },
        apiPayload: { date: day },
        cb: data => {
          onDateSelected(selectedDate, data);
        },
      }),
    );
  };

  const ChargeDetails = ({ title, amount }) => (
    <View>
      <Text style={Styles.chargeTitle}>{title}</Text>
      <Text style={Styles.chargeAmount}>{amount}</Text>
    </View>
  );

  const ImageUsernameUserID = ({ data }) => (
    <View style={Styles.childContainer}>
      <View style={Styles.ImageView}>
        <ImageView
          source={{ uri: UserUtill.image(trainerData ?? {}) }}
          style={Styles.imageStyle}
          placeholderStyle={Styles.imageStyle}
          borderRadius={8}
        />
      </View>
      <View style={Styles.nameUserID}>
        <View style={Styles.textView}>
          <Text style={Styles.username}>
            {UserUtill.name(trainerData ?? {})}
          </Text>
          {/* <Text style={Styles.userid}>Yoga Class</Text> */}
          {/* <View style={{ flexDirection: 'row' }}>
            <Image source={Images.locationIcon} />
            <Text style={Styles.userid} numberOfLines={1}>
              {UserUtill.address(trainerData ?? {})}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
  const Charges = () => {
    let totalPrice = isRealTime
      ? SessionUtill.amount(data)
      : SessionUtill.price(data);

    if (participantsData.length > 0) {
      totalPrice = totalPrice * (participantsData.length + 1);
    }
    // console.log(participantsData.length);
    return (
      <View style={Styles.charges}>
        <ChargeDetails
          title="Session Charges"
          amount={`$ ${
            isRealTime ? SessionUtill.amount(data) : SessionUtill.price(data)
          }/${SessionUtill.duration(data)}min`}
        />
        <ChargeDetails title="Total Payment Due" amount={`$${totalPrice}`} />
      </View>
    );
  };

  const onSelectedPayment = data => {
    // console.log('onSelectedPayment', data);
    setSelectedPayment(data.type);
  };
  const payment = () => (
    <View style={Styles.paymentContainer}>
      <Text style={Styles.selectAppointment}>Payment</Text>
      <Charges />
      <PaymentMethods
        paymentMethods={
          Util.isPlatformAndroid() ? PAYMENT_METHODS_ANDROID : PAYMENT_METHODS
        }
        selectedPayment={selectedPayment}
        onSelectedPayment={onSelectedPayment}
      />
    </View>
  );

  const renderCard = ({ item }) => {
    return (
      <ButtonView
        style={{ marginRight: Metrics.baseMargin }}
        onPress={() => {
          // dispatch()
          // console.log('onImagePress => ', item);
          NavigationService.navigate('AddParticipants', {
            trainerData: trainerData,
            data: item,
            callback: data => {
              const index = participantsData.findIndex(
                val => val.id === data.id,
              );
              if (index >= 0) {
                let arrayData = [...participantsData];
                arrayData[index] = {
                  ...participantsData[index],
                  ...data,
                };
                setParticipantsData(arrayData);
                NavigationService.goBack();
              }
              // console.log('data ==>', data);
            },
          });
        }}>
        <ImageView
          source={{ uri: UserUtill.image(item) }}
          style={Styles.listImageStyle}
          placeholderStyle={Styles.listImageStyle}
          borderRadius={10}
        />
        <Text style={Styles.listText}>
          {UserUtill.firstName(item) + ' ' + UserUtill.lastName(item)}
        </Text>
        <ButtonView
          style={{ position: 'absolute', top: 0, right: 0 }}
          onPress={() => {
            // console.log('onCancelPress => ', item);
            dispatch(
              deleteParticipants.request({
                payloadApi: { id: item.id },
                cb: () => {
                  let arrayData = participantsData.filter(
                    val => val.id !== item.id,
                  );
                  setParticipantsData([...arrayData]);
                },
              }),
            );
          }}>
          <Image source={Images.remove} style={{ width: 30, height: 30 }} />
        </ButtonView>
      </ButtonView>
    );
  };
  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );

  const openPayment = data => {
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
    const paymentIntentForApple = stripe.paymentIntent ?? data?.paymentIntent;
    if (selectedPayment === PAYMENT_TYPE.APPLE) {
      _processApplePay(paymentData.clientSecret, paymentIntentForApple);
    } else if (selectedPayment === PAYMENT_TYPE.GOOGLE) {
      initializeGooglePlay(paymentData);
    } else {
      initializePaymentSheet(paymentData);
    }
  };
  const onBookClassPress = () => {
    let participants = '';
    if (participantsData.length > 0) {
      let participantsId = participantsData.map(val => val.id);
      participants = participantsId.toString();
    }
    if (markedDates.length > 0) {
      let checkIsTheDaySelected = false;
      let day = _.lowerCase(markedDates[0].format('dddd'));
      let availableDateData = data?.availableDateTime ?? [];
      for (let i = 0; i < availableDateData.length; i++) {
        if (availableDateData[i].day === day) {
          checkIsTheDaySelected = true;
        }
      }
      if (!checkIsTheDaySelected) {
        Util.showMessage('You Selected A Wrong Day');
        return;
      }
    } else {
      Util.showMessage('Please Select Day');
      return;
    }
    if (selectedPayment === '') {
      Util.showMessage('Please Select Payment');
      return;
    }

    const payload = {
      classId: ClassUtill.id(data),
      date: markedDates[0].format('YYYY-MM-DD'),
      bookingParticipantIds: participants,
      bookingTime: dayjs(data.startTimeFull).format('hh:mm A'),
      endTimeFull: data.endTimeFull,
      startTimeFull: data.startTimeFull,
    };
    // console.log(payload, selectedPayment);
    dispatch(bookClass.request({ payloadApi: payload, cb: openPayment }));
  };

  const onBookSessionPress = formObj.handleSubmit(val => {
    // console.log('data ==>', data, val);
    if (isRealTime) {
      if (selectedPayment === '') {
        Util.showMessage('Please Select Payment');
        return;
      }
      let participants = '';
      if (participantsData.length > 0) {
        let participantsId = participantsData.map(val => val.id);
        participants = participantsId.toString();
      }
      dispatch(
        createRealBookingIntent.request({
          payloadApi: { id: data.id, bookingParticipantIds: participants },
          cb: openPayment,
        }),
      );
    } else {
      let participants = '';
      if (participantsData.length > 0) {
        let participantsId = participantsData.map(val => val.id);
        participants = participantsId.toString();
      }

      if (markedDates.length > 0 && Util.isPast(markedDates[0])) {
        Util.showMessage('Please Select Future Date');
        return;
      }

      if (selectedTime === '') {
        Util.showMessage('No Slot Selected');
        return;
      }
      if (selectedPayment === '') {
        Util.showMessage('Please Select Payment');
        return;
      }

      const payload = {
        sessionId: SessionUtill.id(data),
        slot: selectedTime,
        date: markedDates[0].format('YYYY-MM-DD'),
        bookingParticipantIds: participants,
        bookingTime: dayjs(data.startTimeFull).format('hh:mm A'),
        endTimeFull: data.endTimeFull,
        startTimeFull: data.startTimeFull,
        address: address,
        location: {
          cordinates: cordinates,
        },
        ...val,
      };
      // console.log(payload, selectedPayment);
      dispatch(bookSession.request({ payloadApi: payload, cb: openPayment }));
    }
  });

  const OnLocation = () => {
    NavigationService.navigate('SearchLocation', {
      onSaveLocation: (location, cordinates) => {
        // console.log('onSaveLocation ==>', location, cordinates);
        setAddress(location);
        setCordinates([...cordinates]);
        NavigationService.goBack();
      },
    });
  };

  const renderContent = data => {
    return (
      <>
        <ImageUsernameUserID data={data} />
        <Text style={Styles.sessionDetail}>
          {' '}
          {isSession || isRealTime ? 'Session Details' : 'Class Details'}
        </Text>

        {/* {isSession && ( */}
        {!isRealTime && (
          <>
            <View style={Styles.selecteDateContainer}>
              <Text style={Styles.selectAppointment}>Select Session Date</Text>
              <HorizontalCalendar
                markedDates={markedDates}
                selectedDate={CallDateApi}
                customDatesStyles={customDatesStyles}
                // onDateSelected={onDateSelected}
              />
            </View>
            {isSession && (
              <View style={Styles.selectTimeContainer}>
                <Text style={Styles.selectAppointment}>
                  Select Session Time
                </Text>
                <TimeSelector
                  timeList={slots}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              </View>
            )}
          </>
        )}
        {/* )} */}
        {(isSession || isRealTime) && (
          <>
            <Text style={Styles.timeFull}>{'Location:'}</Text>
            <ButtonView style={Styles.fullBox} onPress={OnLocation}>
              <Text style={Styles.timeFull} numberOfLines={2}>
                {address}
              </Text>
              <Pressable hitSlop={10}>
                <Image source={Images.locationIcon} />
              </Pressable>
            </ButtonView>
            <Text style={Styles.timeFull}>{'Session Duration:'}</Text>
            <View style={Styles.fullBox}>
              <Text style={Styles.timeFull}>{`${SessionUtill.duration(
                data,
              )} minutes`}</Text>
            </View>
            <Text style={Styles.timeFull}>
              {'Specialty of Session Chosen:'}
            </Text>
            {/* <View style={Styles.fullBox}>
              <Text style={Styles.timeFull}>{'Yoga'}</Text>
              <Pressable hitSlop={10}>
                <Image source={Images.arrowDown} />
              </Pressable>
            </View> */}
            <Dropdown
              placeholder="Select Category"
              data={Util.supportCategoriesArrayForDD(
                trainerData.trainerCategories,
              )}
              {...categoriesProps}
            />
            <Line />
          </>
        )}

        <Text style={Styles.sessionDetail}>{'User Details'}</Text>
        <Text style={Styles.timeFull}>{'Your Name:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>{UserUtill.name(authUser)}</Text>
        </View>
        <Text style={Styles.timeFull}>{'Gender:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>
            {/* {UserUtill.gender(authUser) === ''
              ? UserUtill.gender(authUser) === 'MALE'
                ? 'Male'
                : 'Female'
              : 'Gender'} */}
            {UserUtill.gender(authUser) === 'MALE' ? 'Male' : 'Female'}
          </Text>
        </View>
        <Text style={Styles.timeFull}>{'Date Of Birth:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>
            {UserUtill.age(authUser) !== ''
              ? dayjs(UserUtill.age(authUser)).format('MM/DD/YYYY')
              : 'Date Of Birth'}
          </Text>
        </View>
        <View style={Styles.fullMain}>
          {/* <View style={Styles.innerBox}>
            <Text style={Styles.timeFull}>Date Of Birth:</Text>
            <View style={Styles.box}>
              <Text style={Styles.trainerDetailText}>
                {UserUtill.age(authUser) !== ''
                  ? dayjs(UserUtill.age(authUser)).format('MM/DD/YYYY')
                  : ''}
              </Text>
            </View>
          </View> */}
          <View style={Styles.innerBox}>
            <Text style={Styles.timeFull}>Weight:</Text>
            <View style={Styles.box}>
              <Text style={Styles.trainerDetailText}>
                {UserUtill.weight(authUser)}
                <Text style={Styles.unitText}>
                  {` ${UserUtill.weightUnit(authUser)}`}
                </Text>
              </Text>
            </View>
          </View>
          <View style={Styles.innerBox}>
            <Text style={Styles.timeFull}>Height:</Text>
            <View style={Styles.box}>
              <Text style={Styles.trainerDetailText}>
                {UserUtill.height(authUser)}
                <Text style={Styles.unitText}>
                  {` ${UserUtill.heightUnit(authUser)}`}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <Text style={Styles.timeFull}>Common Health Problems:</Text>
        <View style={Styles.bigBox}>
          <Text style={Styles.bigBoxText}>
            {UserUtill.commonHealthProblem(authUser) === ''
              ? 'Common Health Problem'
              : UserUtill.commonHealthProblem(authUser)}
          </Text>
        </View>
        <Line />

        <View style={{}}>
          <Text style={Styles.textListTitle}>{`Who is coming with you? `}</Text>
          <FlatList
            data={participantsData}
            renderItem={renderCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={{ marginRight: Metrics.baseMargin }}>
                <ButtonView
                  style={Styles.headerViewStyle}
                  onPress={() => {
                    NavigationService.navigate('AddParticipants', {
                      trainerData: trainerData,
                      callback: data => {
                        // console.log('data ==>', data);
                        let arrayData = [...participantsData];
                        arrayData.push(data);
                        setParticipantsData(arrayData);
                        NavigationService.goBack();
                      },
                    });
                  }}>
                  <Image source={Images.addPersonIcon} />
                </ButtonView>
                <Text style={Styles.listText}>{'Add More'}</Text>
              </View>
            )}
          />
        </View>
        <Line />
        {payment()}
        <Button
          title="Pay now"
          onPress={
            isSession || isRealTime ? onBookSessionPress : onBookClassPress
          }
        />
      </>
    );
  };
  return (
    <Container
      headerTitle={isSession ? 'Book a Session' : 'Book a Class'}
      notificationCount="2"
      chat>
      {/* <ScrollViewApi
        // style={Styles.container}
        actionType="GET_TRAINER_SESSION"
        requestAction={getTrainerSession.request}
        identifier={id}
        selectorData={getSessionIdentifierData}
        payload={{ id: id }}
        content={renderContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent(data)}
      </ScrollView>
      <Loader
        type={[
          'BOOK_SESSION',
          'BOOK_CLASS',
          'DELETE_PARTICIPANTS',
          getTrainerSession.type,
        ]}
      />
    </Container>
  );
};

export default UserTrainerSchedule;

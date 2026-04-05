import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
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
  Map,
  AppHeader,
  Dropdown,
  Loader,
  TimePicker,
  Switch,
} from '../../components';

import { PAYMENT_METHODS, SESSION_DURATION } from '../../config/Constants';
import { UserUtill } from '../../dataUtils';
import { getIdentifierTrainer, getUserData } from '../../ducks/auth';
import { findTrainer } from '../../ducks/booking';
import { Colors, Images, Metrics } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { Styles } from './styles';

const markedDateStyle = {
  dateContainerStyle: { backgroundColor: Colors.primary },
};
const FindTrainer = ({ route }) => {
  let currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 30);
  const isSession = route.params?.isSession ?? false;
  const getCategories = useSelector(getIdentifierTrainer('TRAINER_CATEGORY'));
  const userData = useSelector(getUserData);
  const [toggleValue, setToggleValue] = useState(true);
  const [cordinates, setCordinates] = useState(UserUtill.location(userData));
  const [address, setAddress] = useState(UserUtill.address(userData));
  const dispatch = useDispatch();
  const [formObj, durationProps, categoriesProps, startTimeProps] = useHookForm(
    ['duration', 'categories', 'startTime'],
    {
      duration: '30',
      startTime: currentDate,
    },
    ValidationSchema.findTrainer,
  );
  const OnLocation = () => {
    NavigationService.navigate('SearchLocation', {
      onSaveLocation: (location, cordinates) => {
        console.log('onSaveLocation ==>', location, cordinates);
        setAddress(location);
        setCordinates([...cordinates]);
        NavigationService.goBack();
      },
    });
  };
  console.log('cordinates', cordinates);
  // console.log('getCategories', getCategories);
  const submit = formObj.handleSubmit(values => {
    console.log('values', values);
    const payload = {
      ...values,
    };

    if (!toggleValue && Util.isPastTime(values.startTime)) {
      Util.showMessage('Please Select Start Time Correctly');
      return;
    }
    if (toggleValue) {
      payload.now = true;
      payload.startTime = dayjs(new Date()).format('HH:mm');
      payload.startTimeFull = new Date();
      payload.bookingTime = dayjs(values.startTime).format('hh:mm A');
    } else {
      payload.startTime = dayjs(values.startTime).format('HH:mm');
      payload.startTimeFull = values.startTime;
      payload.bookingTime = dayjs(values.startTime).format('hh:mm A');
    }
    payload.address = address;
    payload.location = {
      cordinates: cordinates,
    };
    payload.categoryId = payload.categories;
    delete payload.categories;
    console.log('Payload ==>', payload);
    dispatch(
      findTrainer.request({
        payloadApi: payload,
        cb: () => {
          NavigationService.navigate('SearchTrainer', { payloadData: payload });
        },
      }),
    );
  });

  const ChargeDetails = ({ title, amount }) => (
    <View>
      <Text style={Styles.chargeTitle}>{title}</Text>
      <Text style={Styles.chargeAmount}>{amount}</Text>
    </View>
  );

  const Charges = () => (
    <View style={Styles.charges}>
      <ChargeDetails title="Session Charges" amount="$60/Hr" />
      <ChargeDetails title="Total Payment Due" amount="$180" />
    </View>
  );
  const PartnersList = () => {
    const renderCard = ({ item }) => (
      <View style={{ marginRight: Metrics.baseMargin }}>
        <Image
          source={{ uri: 'https://bit.ly/3JxFYHQ' }}
          style={Styles.listImageStyle}
        />
        <Text style={Styles.listText}>{item}</Text>
      </View>
    );
    return (
      <View style={{}}>
        <Text style={Styles.textListTitle}>{`Who is coming with you? `}</Text>
        <FlatList
          data={['john', 'James', 'Oscar']}
          renderItem={renderCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{ marginRight: Metrics.baseMargin }}>
              <ButtonView
                style={Styles.headerViewStyle}
                onPress={() => {
                  NavigationService.navigate('AddParticipants');
                }}>
                <Image source={Images.addPersonIcon} />
              </ButtonView>
              <Text style={Styles.listText}>{'Add More'}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );
  const currentTime = new Date();

  // Subtract 30 minutes from the minutes component of the time
  currentTime.setMinutes(currentTime.getMinutes() - 30);
  return (
    <Container
      style={{ paddingBottom: 80 }}
      headerTitle="Find Trainer"
      notificationCount="2"
      chat
      isBackButton={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Metrics.ratio(20) }}>
        <View style={Styles.selectTimeContainer}>
          <Text style={Styles.selectAppointment}>
            Select Session Start Time
          </Text>
          <View style={Styles.row}>
            <Text style={Styles.textStyle1}>{'Now'}</Text>
            <Switch value={toggleValue} onTogglePress={setToggleValue} />
          </View>
          {!toggleValue && (
            <View
              style={Styles.selectTime}
              pointerEvents={toggleValue ? 'box-only' : 'auto'}>
              <Controller
                {...startTimeProps}
                render={({ field: { onChange, value } }) => (
                  <TimePicker
                    title="Start time"
                    value={value}
                    onChange={onChange}
                    containerStyle={Styles.timeContainer}
                    textStyle={Styles.textStyle}
                    isTitle={false}
                    extraProps={{
                      minimumDate: new Date(),
                      // maximumDate: currentTime,
                    }}
                  />
                )}
              />
            </View>
          )}
        </View>
        <Text style={Styles.sessionDetail}>{'Session Details'}</Text>

        <Dropdown
          placeholder="Select Categories"
          data={Util.supportCategoriesArrayForDD(getCategories)}
          {...categoriesProps}
        />
        <Text style={Styles.timeFull}>{'Location:'}</Text>
        <ButtonView style={Styles.fullBox} onPress={OnLocation}>
          <Text style={Styles.timeFull}>
            {address !== '' ? address : 'Location'}
          </Text>
          <Pressable hitSlop={10}>
            <Image source={Images.locationIcon} />
          </Pressable>
        </ButtonView>
        <View style={Styles.mapStyle} pointerEvents="box-only">
          <Map
            latitude={cordinates.length > 0 ? cordinates[1] : -1}
            longitude={cordinates.length > 0 ? cordinates[0] : -1}
          />
        </View>
        <Text style={Styles.timeFull}>{'Session Duration:'}</Text>
        <Dropdown
          placeholder="Select Duration"
          data={SESSION_DURATION}
          {...durationProps}
        />
        <Line />
        <Text style={Styles.sessionDetail}>{'User Details'}</Text>
        <Text style={Styles.timeFull}>{'Your Name:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>{UserUtill.name(userData)}</Text>
        </View>
        <Text style={Styles.timeFull}>{'Gender:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>
            {UserUtill.gender(userData) !== ''
              ? UserUtill.gender(userData) === 'MALE'
                ? 'Male'
                : 'Female'
              : 'Gender'}
          </Text>
        </View>
        <Text style={Styles.timeFull}>{'Date Of Birth:'}</Text>
        <View style={Styles.fullBox}>
          <Text style={Styles.timeFull}>
            {UserUtill.age(userData) !== ''
              ? dayjs(UserUtill.age(userData)).format('MM/DD/YYYY')
              : 'Date Of Birth'}
          </Text>
        </View>
        <View style={Styles.fullMain}>
          <View style={Styles.innerBox}>
            <Text style={Styles.timeFull}>Weight:</Text>
            <View style={Styles.box}>
              <Text style={Styles.trainerDetailText}>
                {UserUtill.weight(userData)}
                <Text style={Styles.unitText}>
                  {UserUtill.weightUnit(userData)}
                </Text>
              </Text>
            </View>
          </View>
          <View style={Styles.innerBox}>
            <Text style={Styles.timeFull}>Height:</Text>
            <View style={Styles.box}>
              <Text style={Styles.trainerDetailText}>
                {UserUtill.height(userData)}
                <Text style={Styles.unitText}>
                  {UserUtill.heightUnit(userData)}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <Text style={Styles.timeFull}>Common Health Problems:</Text>
        <ScrollView style={Styles.big} contentContainerStyle={Styles.bigBox}>
          <Text>
            {UserUtill.commonHealthProblem(userData) === ''
              ? 'Common Health Problem'
              : UserUtill.commonHealthProblem(userData)}
          </Text>
        </ScrollView>
        <Line />
        <Button
          title="SEARCH TRAINER"
          // largeButton
          // style={Styles.button}
          onPress={submit}
        />
      </ScrollView>
      <Loader type={'FIND_TRAINERS'} />
    </Container>
  );
};

export default FindTrainer;

import React from 'react';
import { Controller } from 'react-hook-form';
import {
  FlatList,
  Image,
  Pressable,
  View,
  TextInput as RNTextInput,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';

import {
  Button,
  Container,
  Text,
  HorizontalCalendar,
  TimeSelector,
  PaymentMethods,
  ButtonView,
  SelectImage,
  ImageView,
  Dropdown,
  TextInputNative,
  Loader,
  DatePicker,
} from '../../components';

import { GENDER, PAYMENT_METHODS } from '../../config/Constants';
import { UserUtill } from '../../dataUtils';
import { addParticipants, updateParticipants } from '../../ducks/booking';
import { Colors, Images, Metrics } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

import { Styles } from './styles';

const AddParticipants = ({ route }) => {
  const trainerData = route.params?.trainerData ?? false;
  const callback = route.params?.callback ?? undefined;
  const data = route.params?.data ?? {};
  const dispatch = useDispatch();
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 12);

  let updatedDate = new Date();
  const [
    formObj,
    imageProps,
    firstNameProps,
    lastNameProps,
    ganderProps,
    ageProps,
    weightProps,
    heightProps,
    commonHealthProblemProps,
  ] = useHookForm(
    [
      'image',
      'firstName',
      'lastName',
      'gander',
      'age',
      'weight',
      'height',
      'commonHealthProblem',
    ],
    {
      image: UserUtill.image(data),
      firstName: UserUtill.firstName(data),
      lastName: UserUtill.lastName(data),
      gander: UserUtill.gender(data),
      age: UserUtill.age(data),
      weight: UserUtill.weight(data),
      height: UserUtill.height(data),
      commonHealthProblem: UserUtill.commonHealthProblem(data),
    },
    ValidationSchema.participants,
  );

  const onSubmit = formObj.handleSubmit(values => {
    console.log(values);
    console.log(values);
    if (values.weight < 1) {
      Util.showMessage('Please Enter Weight Correctly');
      return;
    }
    if (values.height < 1) {
      Util.showMessage('Please Enter Height Correctly');
      return;
    }
    if (data?.id) {
      dispatch(
        updateParticipants.request({
          payloadApi: values,
          cb: data => {
            console.log('data ==>', data);
            callback?.(data);
          },
          id: data?.id,
        }),
      );
    } else {
      dispatch(
        addParticipants.request({
          payloadApi: values,
          cb: data => {
            console.log('data ==>', data);
            callback?.(data);
          },
        }),
      );
    }
  });

  const ChargeDetails = ({ title, amount }) => (
    <View>
      <Text style={Styles.chargeTitle}>{title}</Text>
      <Text style={Styles.chargeAmount}>{amount}</Text>
    </View>
  );

  const ImageUsernameUserID = () => (
    <View style={Styles.childContainer}>
      <View style={Styles.ImageView}>
        <ImageView
          source={{ uri: UserUtill.image(trainerData) }}
          style={Styles.imageStyle}
          placeholderStyle={Styles.imageStyle}
          borderRadius={8}
        />
      </View>
      <View style={Styles.textView}>
        <Text style={Styles.username}>{UserUtill.name(trainerData)}</Text>
        {/* <Text style={Styles.userid}>Yoga Class</Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={Images.locationPin}
            style={{ width: 10, height: 12, marginRight: Metrics.miniMargin }}
          />
          <Text style={Styles.userid} numberOfLines={1}>
            {UserUtill.address(trainerData)}
          </Text>
        </View>
      </View>
    </View>
  );
  const Charges = () => (
    <View style={Styles.charges}>
      <ChargeDetails title="Session Charges" amount="$60/Hr" />
      <ChargeDetails title="Total Payment Due" amount="$180" />
    </View>
  );
  const Payment = () => (
    <View style={Styles.paymentContainer}>
      <Text style={Styles.selectAppointment}>Payment</Text>
      <Charges />
      <PaymentMethods paymentMethods={PAYMENT_METHODS} />
      <Button title="Pay now" />
    </View>
  );

  const UserDetails = ({ title, controler, isAge, placeholder = '' }) => (
    <Controller
      {...controler}
      render={({ field: { onChange, value } }) => (
        <View style={Styles.userDetails}>
          <Text style={Styles.title}>{title}</Text>
          <View style={Styles.textInputView}>
            <RNTextInput
              style={Styles.textInputSmall}
              value={value === '0' || value === '0.0' ? '' : value}
              placeholder={placeholder}
              placeholderTextColor={Colors.white}
              onChangeText={onChange}
              keyboardType={'numeric'}
            />
          </View>
        </View>
      )}
    />
  );
  return (
    <Container headerTitle="Add Participants" notificationCount="2" chat>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageUsernameUserID />
        <Text style={Styles.textHead}>{'Participant Details'}</Text>
        <Controller
          {...imageProps}
          render={({ field: { onChange, value } }) => (
            <SelectImage
              onChange={onChange}
              value={value}
              error={imageProps.error}
            />
          )}
          defaultValue={''}
        />
        {/* <NameEntery /> */}
        <View style={Styles.fullMain}>
          <View style={{ flex: 0.49 }}>
            <Text style={Styles.timeFull}>{'First Name'}</Text>
            <TextInputNative placeholder="First Name" {...firstNameProps} />
          </View>
          <View style={{ flex: 0.49 }}>
            <Text style={Styles.timeFull}>{'Last Name'}</Text>
            <TextInputNative placeholder="Last Name" {...lastNameProps} />
          </View>
        </View>
        <Text style={Styles.timeFull}>{'Gender:'}</Text>
        <Dropdown placeholder="Select Gender" data={GENDER} {...ganderProps} />
        <Text style={Styles.timeFull}>{'Date Of Birth:'}</Text>
        <Controller
          {...ageProps}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              placeholder="Date Of Birth"
              onChange={onChange}
              value={value}
              error={ageProps.error}
              extraProps={{
                minimumDate: Util.stringToDateObject('1950-01-01'),
                maximumDate: maxDate,
              }}
            />
          )}
          defaultValue={''}
        />
        <View style={Styles.userDetailsContainer}>
          {/* <UserDetails title="Date Of Birth:" controler={ageProps} isAge /> */}
          <UserDetails
            title="Weight (lbs) :"
            controler={weightProps}
            placeholder={'Weight in lbs'}
          />
          <UserDetails
            title="Height (Feet.Inches):"
            controler={heightProps}
            placeholder={'feet.inches'}
          />
        </View>
        <Text style={Styles.timeFull}>Common Health Problems:</Text>
        <TextInputNative
          placeholder=""
          multiline
          inputViewStyle={Styles.bigBox}
          inputContainerStyle={Styles.bigBox}
          {...commonHealthProblemProps}
        />
        <Button title={'ADD PARTICIPANT'} onPress={onSubmit} />
      </ScrollView>
      <Loader type={['ADD_PARTICIPANTS', 'UPDATE_PARTICIPANTS']} />
    </Container>
  );
};

export default AddParticipants;

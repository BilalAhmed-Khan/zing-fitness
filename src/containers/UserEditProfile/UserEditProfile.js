import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Pressable,
  Image,
  View,
  TextInput as RNTextInput,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Dropdown,
  TextInput,
  PhoneNumberInput,
  Text,
  Button,
  ImageView,
  ButtonView,
  TextInputNative,
  Loader,
  DatePicker,
} from '../../components';
import { GENDER } from '../../config/Constants';
import { TIME_ZONES } from '../../config/TimeZones';
import { UserUtill } from '../../dataUtils';
import { authEditProfile, getUserData } from '../../ducks/auth';
import { DropDown } from '../../modal';
import { Colors, Images } from '../../theme';
import { ImagePicker, NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

import { Styles } from './Styles';
const UserEditProfile = () => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const dropDownModalRef = useRef();
  const [phoneCode, setPhoneCode] = useState(UserUtill.phoneCode(userData));
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 12);

  let updatedDate = new Date();
  const [
    formObj,
    imageProps,
    firstNameProps,
    lastNameProps,
    emailProps,
    ganderProps,
    phoneProps,
    ageProps,
    weightProps,
    heightProps,
    commonHealthProblemProps,
    // timeZoneProps,
  ] = useHookForm(
    [
      'image',
      'firstName',
      'lastName',
      'emailAddress',
      'gander',
      'phone',
      'age',
      'weight',
      'height',
      'commonHealthProblem',
      // 'timeZone',
    ],
    {
      image: UserUtill.image(userData),
      firstName: UserUtill.firstName(userData),
      lastName: UserUtill.lastName(userData),
      emailAddress: UserUtill.email(userData),
      gander: UserUtill.gender(userData),
      phone: UserUtill.phone(userData),
      age: UserUtill.age(userData),
      weight: UserUtill.weight(userData),
      height: UserUtill.height(userData),
      commonHealthProblem: UserUtill.commonHealthProblem(userData),
      // timeZone: UserUtill.timeZone(userData),
    },
    ValidationSchema.userProfile,
  );

  const onSubmit = formObj.handleSubmit(values => {
    const payload = { ...values };
    payload.phoneCode = phoneCode;
    payload.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(payload);
    if (payload.weight < 1) {
      Util.showMessage('Please Enter Weight Correctly');
      return;
    }
    if (payload.height < 1) {
      Util.showMessage('Please Enter Height Correctly');
      return;
    }
    dispatch(
      authEditProfile.request({
        payloadApi: payload,
        id: UserUtill.id(userData),
        cb: data => {
          NavigationService.goBack();
          Util.showMessage(
            'Your Profile has been updated sucessfully',
            'sucess',
          );
        },
      }),
    );
  });

  const imagePickerCallback = onChange => {
    ImagePicker.showGalleryAndCameraOptions(val => {
      console.log(val);
      onChange(val.uri);
    });
  };

  const Avatar = ({ value, onChange }) => (
    <ButtonView
      style={Styles.avatarContainer}
      onPress={() => imagePickerCallback(onChange)}>
      <ImageView
        style={Styles.avatar}
        placeholderStyle={Styles.avatar}
        source={{ uri: value }}
        borderRadius={44}
      />
      <Image source={Images.cameraRedBorder} style={Styles.cameraIcon} />
    </ButtonView>
  );
  const UserDetails = ({ title, controler, isAge }) => (
    <Controller
      {...controler}
      render={({ field: { onChange, value } }) => (
        <View style={Styles.userDetails}>
          <Text style={Styles.title}>{title}</Text>
          <View style={Styles.textInputView}>
            <RNTextInput
              style={Styles.textInputSmall}
              value={value}
              onChangeText={onChange}
              placeholder={title}
              keyboardType={'number-pad'}
              placeholderTextColor={Colors.white}
            />
          </View>
        </View>
      )}
    />
  );

  const CommonHealthProblems = () => (
    <View>
      <Text style={Styles.title}>Common Health Problems</Text>
      <RNTextInput
        multiline
        style={Styles.textInput}
        placeholder="Write Here"
        placeholderTextColor="#666666"
      />
    </View>
  );

  const timeZoneOnPress = onChange => {
    dropDownModalRef.current.show({
      data: Util.sortArrayById(TIME_ZONES),
      onPress: item => {
        console.log(item);
        onChange(item?.label);
        // setSelectedStates(item?.state_code);
      },
    });
  };

  const TimeZone = () => (
    <View>
      <Text style={Styles.title}>Time Zone</Text>
      <Dropdown placeholder="Select Timezone" data={TIME_ZONES} />
    </View>
  );
  return (
    <Container headerTitle="Edit Profile" notificationCount="2" chat>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Controller
          {...imageProps}
          render={({ field: { onChange, value } }) => (
            <Avatar onChange={onChange} value={value} />
          )}
        />
        <Dropdown placeholder="Select Gender" data={GENDER} {...ganderProps} />
        <TextInputNative placeholder="First Name" {...firstNameProps} />
        <TextInputNative placeholder="Last Name" {...lastNameProps} />
        <TextInputNative
          placeholder="Email Address"
          keyboardType="email-address"
          editable={false}
          {...emailProps}
        />
        <PhoneNumberInput
          code={phoneCode}
          setCode={setPhoneCode}
          {...phoneProps}
        />
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
          {/* <UserDetails title="Date Of Birth:" value={'33'} controler={ageProps} isAge /> */}
          <UserDetails title="Weight:" value={'75kg'} controler={weightProps} />
          <UserDetails
            title="Height:"
            value={'168cm'}
            controler={heightProps}
          />
        </View>
        <TextInputNative
          placeholder="Common Health Problems"
          {...commonHealthProblemProps}
        />
        {/* <UserDetailsContainer /> */}
        {/* <CommonHealthProblems /> */}
        {/* <Dropdown
          placeholder="Select Timezone"
          data={TIME_ZONES}
          {...timeZoneProps}
        /> */}
        {/* <TextInputNative
          placeholder="Select Timezone"
          {...timeZoneProps}
          onPress={timeZoneOnPress}
        /> */}
      </ScrollView>
      <Button title="Save" largeButton onPress={onSubmit} />
      <Loader type={authEditProfile.type} />
      <DropDown ref={dropDownModalRef} />
    </Container>
  );
};

export default UserEditProfile;

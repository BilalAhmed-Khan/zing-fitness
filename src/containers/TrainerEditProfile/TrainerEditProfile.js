import React, { useRef, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Dropdown,
  PhoneNumberInput,
  Button,
  ImageView,
  ButtonView,
  TextInputNative,
  Loader,
} from '../../components';
import { authEditProfile, getUserData } from '../../ducks/auth';
import { Images, Metrics } from '../../theme';
import { UserUtill } from '../../dataUtils';
import { Styles } from './Styles';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { Controller } from 'react-hook-form';
import { ImagePicker, NavigationService, Util } from '../../utils';
import { GENDER } from '../../config/Constants';
import { DropDown } from '../../modal';

const TrainerEditProfile = () => {
  const userData = useSelector(getUserData);
  const dropDownModalRef = useRef();
  const dispatch = useDispatch();
  const [phoneCode, setPhoneCode] = useState(UserUtill.phoneCode(userData));
  const [cropImage, setCropImage] = useState(UserUtill.cropImage(userData));
  const [
    formObj,
    imageProps,
    firstNameProps,
    lastNameProps,
    emailProps,
    ganderProps,
    phoneProps,
    yearsOfExperienceProps,
    // timeZoneProps,
  ] = useHookForm(
    [
      'image',
      'firstName',
      'lastName',
      'emailAddress',
      'gander',
      'phone',
      'yearsOfExperience',
      // 'timeZone',
    ],
    {
      image: UserUtill.image(userData),
      firstName: UserUtill.firstName(userData),
      lastName: UserUtill.lastName(userData),
      emailAddress: UserUtill.email(userData),
      gander: UserUtill.gender(userData),
      phone: UserUtill.phone(userData),
      yearsOfExperience: UserUtill.yearsOfExperience(userData),
      // timeZone: UserUtill.timeZone(userData),
    },
    ValidationSchema.traineeProfile,
  );

  const imagePickerCallback = onChange => {
    ImagePicker.showGalleryAndCameraOptions(val => {
      ImagePicker.cropImage(
        val,
        {
          width: Metrics.width,
          height: Metrics.width / 2,
        },
        cropImage => {
          onChange(val.uri);
          setCropImage(cropImage.uri);
        },
      );
      // onChange(val.uri);
    });
  };

  const onSubmit = formObj.handleSubmit(values => {
    values.phoneCode = phoneCode;
    values.cropImage = cropImage;
    values.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    dispatch(
      authEditProfile.request({
        payloadApi: values,
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

  return (
    <Container headerTitle="Edit Profile" notificationCount="2" chat>
      <ScrollView
        style={{
          marginHorizontal: 10,
          marginBottom: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <Controller
          {...imageProps}
          render={({ field: { onChange, value } }) => (
            <Avatar onChange={onChange} value={value} />
          )}
          // defaultValue={UserUtill.image(userData)}
        />
        <Dropdown placeholder="Select Gender" data={GENDER} {...ganderProps} />

        <TextInputNative placeholder="First Name" {...firstNameProps} />
        <TextInputNative placeholder="Last Name" {...lastNameProps} />
        <TextInputNative
          placeholder="Email Address"
          keyboardType="email-address"
          {...emailProps}
        />
        <PhoneNumberInput
          code={phoneCode}
          setCode={setPhoneCode}
          {...phoneProps}
        />
        <TextInputNative
          placeholder="Years of Experience*"
          keyboardType="numeric"
          {...yearsOfExperienceProps}
        />
      </ScrollView>
      <Button title="Save" largeButton onPress={onSubmit} />
      <DropDown ref={dropDownModalRef} />
      <Loader type={['AUTH_EDIT_PROFILE']} />
    </Container>
  );
};

export default TrainerEditProfile;

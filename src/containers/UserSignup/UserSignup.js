import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  SelectImage,
  Dropdown,
  TextInput,
  PhoneNumberInput,
  Button,
  TextInputNative,
  Loader,
  DatePicker,
} from '../../components';

import { GENDER } from '../../config/Constants';
import { authSignUp } from '../../ducks/auth';
import { getUserRole } from '../../ducks/general';
import { NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

import { Styles } from './Styles';

const UserSignup = () => {
  const isTrainee = useSelector(getUserRole);
  const dispatch = useDispatch();
  const [phoneCode, setPhoneCode] = useState('US');
  const [cropImage, setCropImage] = useState('');
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 12);
  const [
    formObj,
    imageProps,
    firstNameProps,
    lastNameProps,
    emailProps,
    ganderProps,
    phoneProps,
    yearsOfExperienceProps,
    passwordProps,
    confirmPasswordProps,
  ] = useHookForm(
    [
      'image',
      'firstName',
      'lastName',
      'emailAddress',
      'gander',
      'phone',
      isTrainee ? 'yearsOfExperience' : 'age',
      'password',
      'confirmPassword',
    ],
    {
      // age: maxDate,
    },
    isTrainee ? ValidationSchema.trainerSignUp : ValidationSchema.userSignUp,
  );

  const onSubmit = formObj.handleSubmit(values => {
    if (isTrainee) {
      values.cropImage = cropImage;
    }
    values.phoneCode = phoneCode;
    console.log(values);
    dispatch(
      authSignUp.request({
        payloadApi: values,
        cb: data => {
          console.log('DATA ==>', data);
          NavigationService.navigate('Verification', {
            emailAddress: values?.emailAddress,
          });
        },
      }),
    );
  });

  return (
    <>
      <Container
        headerTitle={isTrainee ? 'Trainer Registration' : 'User Registration'}
        style={Styles.container}>
        <ScrollView
          style={Styles.contentContainer}
          // stickyHeaderIndices={[0]}
          // contentContainerStyle={Styles.scrollViewContent}
          // keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <Controller
            {...imageProps}
            render={({ field: { onChange, value } }) => (
              <SelectImage
                onChange={onChange}
                value={value}
                error={imageProps.error}
                isTrainee={isTrainee}
                setCropImage={setCropImage}
              />
            )}
            defaultValue={''}
          />
          <Dropdown
            placeholder="Select Gender"
            data={GENDER}
            {...ganderProps}
          />
          <TextInputNative
            placeholder="First Name"
            {...firstNameProps}
            autoCapitalize={'words'}
          />
          <TextInputNative
            placeholder="Last Name"
            {...lastNameProps}
            autoCapitalize={'words'}
          />
          <TextInputNative
            placeholder="Email Address"
            keyboardType="email-address"
            {...emailProps}
          />
          <PhoneNumberInput
            {...phoneProps}
            code={phoneCode}
            setCode={setPhoneCode}
          />
          {isTrainee ? (
            <TextInputNative
              placeholder="Years of Experience"
              keyboardType="numeric"
              {...yearsOfExperienceProps}
            />
          ) : (
            <Controller
              {...yearsOfExperienceProps}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholder="Date Of Birth"
                  onChange={onChange}
                  value={value}
                  error={yearsOfExperienceProps.error}
                  extraProps={{
                    minimumDate: Util.stringToDateObject('1950-01-01'),
                    maximumDate: maxDate,
                  }}
                />
              )}
              defaultValue={''}
            />
          )}
          <TextInputNative
            placeholder="Password"
            {...passwordProps}
            secureTextEntry
          />
          <TextInputNative
            placeholder="Confirm Password"
            {...confirmPasswordProps}
            secureTextEntry
          />
          <Button
            title="REGISTER NOW"
            largeButton
            onPress={onSubmit}
            style={Styles.buttonStyle}
          />
        </ScrollView>
      </Container>
      <Loader type={'AUTH_SIGNUP'} />
    </>
  );
};

export default UserSignup;

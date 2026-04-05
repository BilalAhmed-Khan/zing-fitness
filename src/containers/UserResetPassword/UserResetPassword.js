import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import {
  Container,
  Text,
  TextInput,
  Button,
  TextInputNative,
  Loader,
} from '../../components';
import { authChangePassword } from '../../ducks/auth';
import { NavigationService } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

import { Styles } from './Styles';

const UserResetPassword = () => {
  const dispatch = useDispatch();

  const [formObj, oldPassworddProps, newPasswordProps, confirmPasswordProps] =
    useHookForm(
      ['oldPassword', 'newPassword', 'confirmPassword'],
      {},
      ValidationSchema.changePassword,
    );

  const onSubmit = formObj.handleSubmit(values => {
    delete values.confirmPassword;
    console.log(values);
    dispatch(
      authChangePassword.request({
        payloadApi: values,
        cb: data => {
          NavigationService.goBack();
        },
      }),
    );
  });

  return (
    <>
      <Container headerTitle="Reset Password" notificationCount="2" chat>
        <TextInputNative
          placeholder="Old Password"
          {...oldPassworddProps}
          secureTextEntry
        />
        <TextInputNative
          placeholder="New Password"
          {...newPasswordProps}
          secureTextEntry
        />
        <TextInputNative
          placeholder="Confirm Password"
          {...confirmPasswordProps}
          secureTextEntry
        />
        <Button
          title="Save"
          largeButton
          style={Styles.button}
          onPress={onSubmit}
        />
      </Container>
      <Loader type={'AUTH_CHANGE_PASSWORD'} />
    </>
  );
};

export default UserResetPassword;

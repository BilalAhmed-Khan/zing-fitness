import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Text,
  Button,
  TextInputNative,
  Loader,
} from '../../components';
import { Images } from '../../theme';
import Styles from './styles';
import { getUserRole } from '../../ducks/general';
import { NavigationService } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { authForgetPassword, authResetPassword } from '../../ducks/auth';

const ResetPassword = ({ route }) => {
  const token = route.params?.token ?? false;
  const isTrainee = useSelector(getUserRole);
  const dispatch = useDispatch();
  const [formObj, passwordProps, confirmPasswordProps] = useHookForm(
    ['newPassword', 'confirmPassword'],
    {},
    ValidationSchema.resetPassword,
  );

  // submit
  const submit = formObj.handleSubmit(values => {
    console.log('values', values);
    delete values.confirmPassword;
    values.passwordResetToken = token;
    dispatch(
      authResetPassword.request({
        payloadApi: values,
        cb: data => {
          NavigationService.navigate('Login');
        },
      }),
    );
  });

  return (
    <>
      <Container headerTitle="Reset Password">
        <Image source={Images.logoWithText} style={Styles.logo} />
        <View style={Styles.buttonContainer}>
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
            title="SAVE"
            largeButton
            onPress={submit}
            style={Styles.buttonContainer}
          />
        </View>
      </Container>
      <Loader type={'AUTH_RESET_PASSWORD'} />
    </>
  );
};

export default ResetPassword;

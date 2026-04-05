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
import { authForgetPassword } from '../../ducks/auth';

const ForgetPassword = () => {
  const isTrainee = useSelector(getUserRole);
  const dispatch = useDispatch();

  const [formObj, emailProps] = useHookForm(
    ['emailAddress'],
    {},
    ValidationSchema.forgetPassword,
  );

  // submit
  const submit = formObj.handleSubmit(values => {
    console.log('values', values);
    dispatch(
      authForgetPassword.request({
        payloadApi: values,
        cb: data => {
          NavigationService.navigate('Verification', {
            emailAddress: values?.emailAddress,
            isForgot: true,
          });
        },
      }),
    );
  });

  return (
    <>
      <Container headerTitle="Forgot Password">
        <Image source={Images.logoWithText} style={Styles.logo} />
        <View style={Styles.buttonContainer}>
          <TextInputNative placeholder="Email" {...emailProps} />
          <Button
            title="SEND"
            largeButton
            onPress={submit}
            style={Styles.buttonContainer}
          />
        </View>
      </Container>
      <Loader type={'AUTH_FORGET_PASSWORD'} />
    </>
  );
};

export default ForgetPassword;

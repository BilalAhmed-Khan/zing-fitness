import React from 'react';
import { View, Pressable, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Text,
  TextInput,
  Button,
  TextInputNative,
  ButtonView,
  Loader,
} from '../../components';
import { Images } from '../../theme';
import Styles from './Styles';
import { getUserRole, setUserRole } from '../../ducks/general';
import { NavigationService, SocialLoginUtill, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { appleToken, authLogin, externalLogin } from '../../ducks/auth';

const Login = () => {
  const isTrainer = useSelector(getUserRole);

  const dispatch = useDispatch();

  // init form inputs
  const [formObj, emailProps, passwordProps] = useHookForm(
    ['emailAddress', 'password'],
    {
      emailAddress: __DEV__ ? 'waiz@yopmail.com' : '',
      password: __DEV__ ? 'Admin@123' : '',
    },
    ValidationSchema.logIn,
  );

  // submit
  const submit = formObj.handleSubmit(values => {
    console.log('values', values);
    values.userType = isTrainer ? 'TRAINER' : 'USER';
    dispatch(
      authLogin.request({
        payloadApi: values,
        cb: data => {
          console.log('data?.user_details.age', data);
          const role = data?.userType ?? data?.user_type;
          if (role === 'USER') {
            NavigationService.reset('UserApp');
            dispatch(setUserRole({ trainer: false }));
          } else {
            NavigationService.reset('TrainerApp');
            dispatch(setUserRole({ trainer: true }));
          }
        },
      }),
    );
  });

  const onPressSignUp = () => {
    NavigationService.navigate('UserRoleSelection', { isLogin: true });
    // navigate('TrainerRegister');
  };
  const onPressForegetPassword = () => {
    NavigationService.navigate('ForgetPassword');
    // navigate('TrainerRegister');
  };

  const ForgotPassword = () => (
    <ButtonView
      style={Styles.forgotPasswordContainer}
      onPress={onPressForegetPassword}>
      <Text style={Styles.forgotPassword}>Forgot Password?</Text>
    </ButtonView>
  );

  const OR = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
      <Text style={Styles.orText}>OR</Text>
      <View style={Styles.horizontalLine} />
    </View>
  );

  const NeedanAccount = () => (
    <View style={Styles.signUpContainer}>
      <Text style={Styles.needAnAccount}>Need an Account?</Text>
      <ButtonView onPress={onPressSignUp}>
        <Text style={Styles.signUp}> Sign up</Text>
      </ButtonView>
    </View>
  );

  const appleDecodeToken = identityToken => {
    dispatch(
      appleToken.request({
        payloadApi: { token: identityToken },
        cb: decoded => {
          console.log(decoded);
          const applePayload = {
            platformId: decoded.nonce,
            emailAddress: decoded.email,
          };
          externalLoginApi(applePayload);
        },
      }),
    );
  };

  const externalLoginApi = values => {
    const payloadApi = {
      ...values,
      userType: isTrainer ? 'TRAINER' : 'USER',
    };
    console.log(payloadApi);
    dispatch(
      externalLogin.request({
        payloadApi,
        cb: data => {
          console.log(data, 'data');
          const role = data?.userType ?? data?.user_type ?? payloadApi.userType;

          if (role === 'USER') {
            NavigationService.reset('UserApp');
            dispatch(setUserRole({ trainer: false }));
            return;
          }
          if (role === 'TRAINER') {
            if (!data?.isProfileCompleted) {
              NavigationService.navigate('TrainerEditCertificates', {
                data: data,
              });
            } else {
              NavigationService.reset('TrainerApp');
            }
            dispatch(setUserRole({ trainer: true }));
          }
        },
      }),
    );
  };

  return (
    <>
      <Container headerTitle="Login">
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <Image source={Images.logoWithText} style={Styles.logo} />
          <TextInputNative placeholder="Email" {...emailProps} />
          <TextInputNative
            placeholder="Password"
            secureTextEntry
            {...passwordProps}
          />
          <ForgotPassword />
          <Button title="LOGIN" largeButton onPress={submit} />
          <NeedanAccount />
          <OR />
          {Util.isPlatformIOS() && (
            <Button
              title="APPLE"
              largeButton
              style={Styles.appleButton}
              titleStyle={Styles.appleTextStyle}
              onPress={() => {
                SocialLoginUtill.appleLogin(appleDecodeToken);
              }}
            />
          )}
          <Button
            title="GOOGLE"
            largeButton
            style={Styles.googleButton}
            titleStyle={Styles.googleTextStyle}
            onPress={() => {
              SocialLoginUtill.googleLogin(externalLoginApi);
            }}
          />
          <Button
            title="FACEBOOK"
            largeButton
            style={Styles.facebookButton}
            onPress={() => {
              SocialLoginUtill.facebookLogin(externalLoginApi);
            }}
          />
        </ScrollView>
      </Container>
      <Loader type={['AUTH_LOGIN', 'AUTH_EXTERNAL_LOGIN', appleToken.type]} />
    </>
  );
};

export default Login;

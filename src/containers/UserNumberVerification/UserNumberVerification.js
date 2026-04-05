import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonView,
  CodeInput,
  Container,
  Loader,
  Text,
} from '../../components';
import { authEmailVerification } from '../../ducks/auth';
import { getUserRole } from '../../ducks/general';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const UserNumberVerification = ({ route }) => {
  const emailAddress = route.params?.emailAddress ?? 'subhan.user@yopmail.com';
  const isForgot = route.params?.isForgot ?? false;
  const dispatch = useDispatch();
  const isTrainee = useSelector(getUserRole);
  const onPressChange = () => {
    NavigationService.goBack();
  };
  const [value, setValue] = useState('');
  const onPressContinue = () => {
    const payloadApi = {
      emailAddress,
      code: '6247',
      isRegistartion: !isForgot,
    };
    dispatch(
      authEmailVerification.request({
        payloadApi,
        cb: data => {
          console.log('data ===>', data);
          isForgot
            ? NavigationService.navigate('ResetPassword', {
                token: data?.passwordResetToken ?? '',
              })
            : isTrainee
            ? NavigationService.navigate('TrainerEditCertificates', {
                isFirstTime: true,
              })
            : NavigationService.navigate('UserSelectHeight');
        },
      }),
    );
  };
  const EmailAndChange = () => (
    <View style={Styles.emailAndChange}>
      <Text style={Styles.email}>{emailAddress}</Text>
      {/* <ButtonView onPress={onPressChange}>
        <Text style={Styles.changeButton}> Change</Text>
      </ButtonView> */}
    </View>
  );
  const CodeNotReceived = () => (
    <View style={Styles.codeNotReceived}>
      <Text style={Styles.codeNotReceivedDesc}>Didn't received your code?</Text>
      <ButtonView>
        <Text style={Styles.resendButton}> Resend</Text>
      </ButtonView>
    </View>
  );
  console.log('code ===>', value);
  return (
    <>
      <Container
        headerTitle={isTrainee ? 'Trainer Registration' : 'User Registration'}>
        <View style={Styles.container}>
          <Text style={Styles.title}>Email Verification</Text>
          <Text style={Styles.subTitle}>We sent a code to your Email</Text>
          <EmailAndChange />
          <CodeInput value={value} onChange={setValue} />
          <CodeNotReceived />
        </View>
        <Button
          title="Continue"
          largeButton
          onPress={onPressContinue}
          disabled={value.length <= 3}
        />
      </Container>
      <Loader type={['AUTH_EMAIL_VERIFICATION']} />
    </>
  );
};

export default UserNumberVerification;

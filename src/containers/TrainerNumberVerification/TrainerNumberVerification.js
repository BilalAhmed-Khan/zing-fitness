import React from 'react';
import { View, Pressable } from 'react-native';
import { Button, CodeInput, Container, Text } from '../../components';
import { NavigationService } from '../../utils';

import { Styles } from './Styles';

const TrainerNumberVerification = () => {
  const onPressChange = () => {
    NavigationService.goBack();
  };
  const onPressContinue = () => {
    NavigationService.navigate('TrainerCertificates');
  };
  const EmailAndChange = () => (
    <View style={Styles.emailAndChange}>
      <Text style={Styles.email}>user@gmail.com</Text>
      <Pressable onPress={onPressChange}>
        <Text style={Styles.changeButton}> Change</Text>
      </Pressable>
    </View>
  );
  const CodeNotReceived = () => (
    <View style={Styles.codeNotReceived}>
      <Text style={Styles.codeNotReceivedDesc}>Didn't received your code?</Text>
      <Pressable>
        <Text style={Styles.resendButton}> Resend</Text>
      </Pressable>
    </View>
  );
  return (
    <Container headerTitle="Trainer Registration">
      <View style={Styles.container}>
        <Text style={Styles.title}>Email Verification</Text>
        <Text style={Styles.subTitle}>We sent a code to your Email</Text>
        <EmailAndChange />
        <CodeInput />
        <CodeNotReceived />
      </View>
      <Button title="Continue" largeButton onPress={onPressContinue} />
    </Container>
  );
};

export default TrainerNumberVerification;

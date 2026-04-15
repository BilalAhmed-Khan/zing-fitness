import React from 'react';
import { Image, ImageBackground, View } from 'react-native';

import {
  Container,
  Button,
  Text,
  ContentAttributesText,
} from '../../components';
import { Images, Metrics } from '../../theme';
import { NavigationService } from '../../utils';

import Styles from './Styles';

const Welcome = () => {
  const onPressGetStarted = () => {
    NavigationService.navigate('UserRoleSelection');
  };
  const TextContent = () => (
    <View style={Styles.textContent}>
      <Text style={Styles.title}>Welcome</Text>
      <ContentAttributesText
        content={
          'Create an account or sign in. By continuing, you agree to our'
        }
        seperatorTile={'and'}
        phrase1CallBack={() => {
          NavigationService.navigate('TermsAndPolices');
        }}
        phrase2CallBack={() => {
          NavigationService.navigate('TermsAndPolices');
        }}
        textStyle={Styles.alignStyle}
      />
    </View>
  );
  return (
    <ImageBackground source={Images.bg} style={{ flex: 1 }}>
      <View style={Styles.container}>
        <Image source={Images.logoIcon} />
        <TextContent />
        <Button title="GET STARTED" onPress={onPressGetStarted} />
      </View>
    </ImageBackground>
  );
};

export default Welcome;

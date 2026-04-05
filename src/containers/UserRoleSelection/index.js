import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Container, Button, Text, ButtonView } from '../../components';
import { setUserRole } from '../../ducks/general';
import { navigate } from '../../services/NavigationService';
import { Colors, Images, Metrics } from '../../theme';
import { NavigationService } from '../../utils';

import Styles from './styles';

const Welcome = ({ route }) => {
  const isLogin = route?.params?.isLogin ?? false;
  const dispatch = useDispatch();
  const onPressGetStarted = () => {
    NavigationService.navigate('Login');
  };

  const onPressUser = () => {
    dispatch(setUserRole({ trainer: false }));
    isLogin
      ? NavigationService.navigate('Register')
      : NavigationService.navigate('Login');
  };
  const onPressTrainee = () => {
    dispatch(setUserRole({ trainer: true }));
    isLogin
      ? NavigationService.navigate('Register')
      : NavigationService.navigate('Login');
  };
  const AlreadyAMember = () => (
    <View style={Styles.signUpContainer}>
      <Text style={Styles.needAnAccount}>Already a Member??</Text>
      <ButtonView onPress={onPressGetStarted}>
        <Text style={Styles.signUp}> Sign In</Text>
      </ButtonView>
    </View>
  );
  return (
    <ImageBackground source={Images.userRoleBg} style={{ flex: 1 }}>
      <View style={Styles.container}>
        <Image source={Images.logoWithText} />
        {/* <TextContent /> */}
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={Styles.selectionText}>{'I am a...'}</Text>
          <Button
            title="USER"
            onPress={onPressUser}
            style={Styles.userButtonStyle}
          />
          <Button
            title="TRAINER"
            onPress={onPressTrainee}
            style={Styles.traineButtonStyle}
          />
          <AlreadyAMember />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

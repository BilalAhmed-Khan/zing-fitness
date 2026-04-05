import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Welcome,
  Login,
  TrainerSignup,
  TrainerNumberVerification,
  TrainerCertificates,
  TrainerCategories,
  TrainerSessionDetail,
  TrainerSessionRating,
  TrainerSessionType,
  TrainerServiceAreas,
  TrainerSchedule,
} from '../containers';
const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="TrainerRegister" component={TrainerSignup} />
    <Stack.Screen name="Verification" component={TrainerNumberVerification} />
    <Stack.Screen name="TrainerCertificates" component={TrainerCertificates} />
    <Stack.Screen name="TrainerCategories" component={TrainerCategories} />
    <Stack.Screen
      name="TrainerSessionDetail"
      component={TrainerSessionDetail}
    />
    <Stack.Screen
      name="TrainerSessionRating"
      component={TrainerSessionRating}
    />
    <Stack.Screen name="TrainerSessionType" component={TrainerSessionType} />
    <Stack.Screen name="TrainerServiceAreas" component={TrainerServiceAreas} />
    <Stack.Screen name="TrainerSchedule" component={TrainerSchedule} />
  </Stack.Navigator>
);

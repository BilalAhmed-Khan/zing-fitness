import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TrainerTabNavigator } from './';
import {
  UserResetPassword,
  TrainerEditCertificates,
  TrainerEditCategories,
  TrainerEditSessionType,
  TrainerLocationSettings,
  TrainerEditProfile,
  TrainerEditSchedule,
  TranieeCreateClass,
} from '../containers';
import TraineeManageClass from '../containers/TranieeManageClass';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TrainerTabs" component={TrainerTabNavigator} />
    <Stack.Screen name="TrainerResetPassword" component={UserResetPassword} />
    <Stack.Screen
      name="TrainerEditCertificates"
      component={TrainerEditCertificates}
    />
    <Stack.Screen
      name="TrainerEditCategories"
      component={TrainerEditCategories}
    />
    <Stack.Screen
      name="TrainerEditSessionType"
      component={TrainerEditSessionType}
    />
    <Stack.Screen
      name="TrainerLocationSettings"
      component={TrainerLocationSettings}
    />
    <Stack.Screen name="TrainerEditProfile" component={TrainerEditProfile} />
    <Stack.Screen name="TrainerEditSchedule" component={TrainerEditSchedule} />
    <Stack.Screen name="TraineeManageClass" component={TraineeManageClass} />
    <Stack.Screen name="TranieeCreateClass" component={TranieeCreateClass} />
  </Stack.Navigator>
);

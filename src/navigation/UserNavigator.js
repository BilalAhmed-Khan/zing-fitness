import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserTabNavigator } from './';
import {
  UserTrainerProfile,
  UserBookAppointment,
  UserTrainerSchedule,
  UserSettings,
  UserEditProfile,
  UserResetPassword,
  UserLocationSettings,
  UserPaymentSettings,
  UserNotificationSettings,
  UserTermsAndPolicies,
  UserHelp,
  UserStartSession,
  UserEndSession,
  UserRateTrainer,
  FeaturedTrainer,
  TranieeCreateClass,
  UserSessionDetail,
  AddParticipants,
  FindTrainer,
  UserSearch,
  SearchTrainer,
} from '../containers';
import TraineeManageClass from '../containers/TranieeManageClass';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserTabs" component={UserTabNavigator} />
    <Stack.Screen name="UserTrainerProfile" component={UserTrainerProfile} />
    <Stack.Screen name="UserBookAppointment" component={UserBookAppointment} />
    <Stack.Screen name="UserTrainerSchedule" component={UserTrainerSchedule} />
    <Stack.Screen name="UserSettings" component={UserSettings} />
    <Stack.Screen name="UserEditProfile" component={UserEditProfile} />
    <Stack.Screen name="UserResetPassword" component={UserResetPassword} />
    <Stack.Screen
      name="UserLocationSettings"
      component={UserLocationSettings}
    />
    <Stack.Screen name="UserPaymentSettings" component={UserPaymentSettings} />
    <Stack.Screen
      name="UserNotificationSettings"
      component={UserNotificationSettings}
    />
    <Stack.Screen
      name="UserTermsAndPolicies"
      component={UserTermsAndPolicies}
    />
    <Stack.Screen name="UserHelp" component={UserHelp} />
    <Stack.Screen name="UserStartSession" component={UserStartSession} />
    <Stack.Screen name="UserEndSession" component={UserEndSession} />
    <Stack.Screen name="UserRateTrainer" component={UserRateTrainer} />
    <Stack.Screen name={'FeaturedTrainer'} component={FeaturedTrainer} />
    <Stack.Screen name="TraineeManageClass" component={TraineeManageClass} />
    <Stack.Screen name="TranieeCreateClass" component={TranieeCreateClass} />
    <Stack.Screen name="UserSessionDetail" component={UserSessionDetail} />
    <Stack.Screen name="AddParticipants" component={AddParticipants} />
    <Stack.Screen name="FindTrainer" component={FindTrainer} />
    <Stack.Screen name="UserSearch" component={UserSearch} />
    <Stack.Screen name="SearchTrainer" component={SearchTrainer} />
  </Stack.Navigator>
);

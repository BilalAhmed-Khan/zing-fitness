import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  UserAuthNavigator,
  UserNavigator,
  TrainerNavigator,
  TrainerAuthNavigator,
} from './';
import {
  AddConfigureBreaks,
  BankDetails,
  Chat,
  ForgetPassword,
  Login,
  Notification,
  NotificationSetting,
  ResetPassword,
  SearchLocation,
  TermsAndPolices,
  TrainerCategories,
  TrainerCertificates,
  TrainerChat,
  TrainerConfigureBreaks,
  TrainerEditCertificates,
  TrainerNumberVerification,
  TrainerSchedule,
  TrainerServiceAreas,
  TrainerSessionCancel,
  TrainerSessionDetail,
  TrainerSessionRating,
  TrainerSessionType,
  TrainerSignup,
  TransactionListing,
  UserAuthMap,
  UserHealthProblems,
  UserHelp,
  UserNumberVerification,
  UserRoleSelection,
  UserSelectHeight,
  UserSelectWeight,
  UserSignup,
  UserTrainerSchedule,
  Welcome,
} from '../containers';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { DataHandler, NavigationService } from '../utils';
import { Colors } from '../theme';
import { getUserData } from '../ducks/auth';
import { getUserRole } from '../ducks/general';

const Stack = createNativeStackNavigator();

const StackScreens = () => {
  const user = getUserData(DataHandler.getStore().getState());
  const isTrainee = getUserRole(DataHandler.getStore().getState());
  let initialState = 'Welcome';
  if (user?.id) {
    initialState = !isTrainee
      ? 'UserApp'
      : user?.session !== null
      ? 'TrainerApp'
      : 'TrainerCertificates';
  }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialState}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="UserRoleSelection" component={UserRoleSelection} />
      <Stack.Screen name="Register" component={UserSignup} />
      <Stack.Screen name="Verification" component={UserNumberVerification} />
      <Stack.Screen name="UserSelectHeight" component={UserSelectHeight} />
      <Stack.Screen name="UserSelectWeight" component={UserSelectWeight} />
      <Stack.Screen name="UserHealthProblems" component={UserHealthProblems} />
      <Stack.Screen name="UserAuthMap" component={UserAuthMap} />
      <Stack.Screen name="TrainerRegister" component={TrainerSignup} />
      <Stack.Screen
        name="TrainerNumberVerification"
        component={TrainerNumberVerification}
      />
      <Stack.Screen
        name="TrainerCertificates"
        component={TrainerCertificates}
      />
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
      <Stack.Screen
        name="TrainerServiceAreas"
        component={TrainerServiceAreas}
      />
      <Stack.Screen name="TrainerSchedule" component={TrainerSchedule} />

      {/* <Stack.Screen name="TrainerAuth" component={TrainerAuthNavigator} /> */}
      <Stack.Screen
        name="TrainerEditCertificates"
        component={TrainerEditCertificates}
      />
      <Stack.Screen name="SearchLocation" component={SearchLocation} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <Stack.Screen
        name="TrainerSessionCancel"
        component={TrainerSessionCancel}
      />

      <Stack.Screen
        name="UserTrainerSchedule"
        component={UserTrainerSchedule}
      />
      <Stack.Screen name="TransactionListing" component={TransactionListing} />
      <Stack.Screen name="UserHelp" component={UserHelp} />
      <Stack.Screen name="TermsAndPolices" component={TermsAndPolices} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="TrainerChat" component={TrainerChat} />
      <Stack.Screen
        name="TrainerConfigureBreaks"
        component={TrainerConfigureBreaks}
      />
      <Stack.Screen name="AddConfigureBreaks" component={AddConfigureBreaks} />
      <Stack.Screen name="UserApp" component={UserNavigator} />
      <Stack.Screen name="TrainerApp" component={TrainerNavigator} />
    </Stack.Navigator>
  );
};
const AppContainer = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        dark: false,
        colors: {
          ...DefaultTheme.colors,
          background: Colors.appBackgroundColor,
        },
      }}
      ref={NavigationService.navigationRef}>
      <StackScreens />
    </NavigationContainer>
  );
};

export default AppContainer;

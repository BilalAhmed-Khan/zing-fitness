import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Welcome,
  Login,
  UserSignup,
  UserNumberVerification,
  UserSelectHeight,
  UserSelectWeight,
  UserHealthProblems,
  UserAuthMap,
  UserRoleSelection,
} from '../containers';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="UserRoleSelection" component={UserRoleSelection} />
    <Stack.Screen name="Register" component={UserSignup} />
    <Stack.Screen name="Verification" component={UserNumberVerification} />
    <Stack.Screen name="UserSelectHeight" component={UserSelectHeight} />
    <Stack.Screen name="UserSelectWeight" component={UserSelectWeight} />
    <Stack.Screen name="UserHealthProblems" component={UserHealthProblems} />
    <Stack.Screen name="UserAuthMap" component={UserAuthMap} /> */}
  </Stack.Navigator>
);

import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  TrainerHome,
  TrainerCalendar,
  TrainerDashboard,
  TrainerChat,
  TrainerProfile,
} from '../containers';
import { Colors, Images, Metrics } from '../theme';
import { Util } from '../utils';

const Tab = createBottomTabNavigator();

const TrainerTab = ({ route }) => {
  React.useLayoutEffect(() => {
    if (Util.getNestedRouteName(route) === 'TrainerHome') {
      Util.refreshAuthData();
    }
  }, [route]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const { name } = route;

        return {
          headerShown: false,
          tabBarShowLabel: false,
          sceneContainerStyle: {
            borderWidth: 3,
            borderColor: 'blue',
          },
          tabBarStyle: {
            width: '96%',
            position: 'absolute',
            bottom: Platform.OS === 'android' ? 12 : 32,
            left: '2%',
            alignSelf: 'center',
            height:
              Platform.OS === 'android'
                ? Metrics.getScreenHeightPercentage(10)
                : Metrics.getScreenHeightPercentage(8),
            borderRadius: 12,
            paddingBottom: 0,
          },
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (name === 'TrainerHome') {
              iconName = Images.homeTab;
            } else if (name === 'TrainerCalendar') {
              iconName = Images.calendarTab;
            } else if (name === 'TrainerDashboard') {
              iconName = Images.dashboardTab;
            } else if (name === 'TrainerChat') {
              iconName = Images.chatTab;
            } else if (name === 'TrainerProfile') {
              iconName = Images.profileTab;
            }

            const focusedStyle = { tintColor: focused ? Colors.blue : '' };

            return <Image source={iconName} style={focusedStyle} />;
          },
        };
      }}>
      <Tab.Screen name="TrainerHome" component={TrainerHome} />
      <Tab.Screen name="TrainerCalendar" component={TrainerCalendar} />
      <Tab.Screen name="TrainerDashboard" component={TrainerDashboard} />
      <Tab.Screen name="TrainerChat" component={TrainerChat} />
      <Tab.Screen name="TrainerProfile" component={TrainerProfile} />
    </Tab.Navigator>
  );
};

export default TrainerTab;

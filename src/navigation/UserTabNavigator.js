import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  UserHome,
  UserCalendar,
  UserSearch,
  UserProfiles,
  UserMyProfile,
  TrainerCalendar,
  FindTrainer,
} from '../containers';
import { Colors, Images, Metrics } from '../theme';
import { Util } from '../utils';

const Tab = createBottomTabNavigator();

const BottomTab = ({ route }) => {
  React.useLayoutEffect(() => {
    if (Util.getNestedRouteName(route) === 'UserHome') {
      Util.refreshNotificationData();
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

            if (name === 'UserHome') {
              iconName = Images.homeTab;
            } else if (name === 'UserCalendar') {
              iconName = Images.calendarTab;
            } else if (name === 'FindTrainer') {
              iconName = Images.search;
            } else if (name === 'UserProfiles') {
              iconName = Images.trainersTab;
            } else if (name === 'UserMyProfile') {
              iconName = Images.profileTab;
            }

            const focusedStyle = {
              tintColor: focused ? Colors.blue : Colors.mediumGrey,
            };

            return (
              <Image
                source={iconName}
                style={[
                  focusedStyle,
                  name === 'FindTrainer' && {
                    width: 30,
                    height: 32,
                    tintColor: focused ? Colors.blue : Colors.primary,
                  },
                ]}
              />
            );
          },
        };
      }}>
      <Tab.Screen name="UserHome" component={UserHome} />
      <Tab.Screen name="UserCalendar" component={TrainerCalendar} />
      <Tab.Screen name="FindTrainer" component={FindTrainer} />
      <Tab.Screen name="UserProfiles" component={UserProfiles} />
      <Tab.Screen name="UserMyProfile" component={UserMyProfile} />
    </Tab.Navigator>
  );
};

export default BottomTab;

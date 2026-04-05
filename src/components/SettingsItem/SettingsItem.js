import React from 'react';
import { Pressable, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from '../';
import { Styles } from './Styles';
import { NavigationService } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { authUserLogout, deleteAccount, getUserData } from '../../ducks/auth';
import { UserUtill } from '../../dataUtils';
import { getHelp } from '../../ducks/general';

const SettingsItem = ({ data }) => {
  const { icon, title, color, navigationScreen } = data;
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);

  const _onPress = () => {
    if (title === 'Logout') {
      dispatch(
        authUserLogout.request({
          payloadApi: {},
          cb: data => {
            NavigationService.reset('UserRoleSelection');
          },
        }),
      );
    } else if (title === 'Delete Account') {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account.',
        [
          {
            text: 'Yes',
            onPress: () => {
              dispatch(
                deleteAccount.request({
                  payloadApi: {},
                  cb: data => {
                    NavigationService.reset('UserRoleSelection');
                  },
                }),
              );
            },
          },
          {
            text: 'No',
            onPress: () => {},
          },
        ],
      );
    } else if (title === 'Terms & Policies') {
      dispatch(
        getHelp.request({
          payloadApi: {},
          cb: data => {
            NavigationService.navigate('UserTermsAndPolicies', { data });
          },
        }),
      );
    }

    if (title === 'TrainerServiceAreas') {
      NavigationService.navigate(navigationScreen, {
        isEdit: true,
      });
    } else if (navigationScreen) {
      NavigationService.navigate(navigationScreen, {
        id: UserUtill.id(userData),
      });
    }
  };

  return (
    <Pressable style={Styles.container} onPress={_onPress}>
      <Image source={icon} style={[{}, color && { tintColor: color }]} />
      <Text style={[Styles.title, color && { color }]}>{title}</Text>
    </Pressable>
  );
};

SettingsItem.propTypes = {
  data: PropTypes.object,
};

export default SettingsItem;

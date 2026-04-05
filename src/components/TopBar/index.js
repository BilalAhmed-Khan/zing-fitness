// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { View, Image } from 'react-native';
import styles from './styles';
import Text from '../Text/Text';
import { getUserData } from '../../ducks/auth';
import { UserUtill } from '../../dataUtils';

const TopBar = ({}) => {
  const getUserInfo = useSelector(getUserData);
  console.log('getUserInfo ===>', getUserInfo);
  let isComplete =
    getUserInfo?.session && getUserInfo?.trainerCategories?.length > 0;

  return !getUserInfo.isProfileCompleted ? (
    <View style={styles.container}>
      <Text style={styles.text}>
        {'Please complete your Profile to Get full access!'}
      </Text>
    </View>
  ) : !getUserInfo.isApproved ? (
    <View style={styles.container}>
      <Text style={styles.text}>{'Account is not approved by admin!'}</Text>
    </View>
  ) : null;
};

export default TopBar;

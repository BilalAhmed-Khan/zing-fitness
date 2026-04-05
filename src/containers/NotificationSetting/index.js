import React, { useEffect, useState } from 'react';
import { Container, Switch, Text } from '../../components';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SettingList } from '../../common';

// import {setting} from '../../data';
// import {
//   getUserToggles,
//   requestUpdateNotificationToggles,
// } from '../../ducks/auth';

import styles from './styles';
import { notificationSettingData } from '../../config/Constants';
import { authEditProfile, getUserToggles } from '../../ducks/auth';

const NotificationSetting = () => {
  const [data, setData] = useState([]);
  const allowNotifications = useSelector(getUserToggles);
  const dispatch = useDispatch();

  console.log(allowNotifications);
  useEffect(() => {
    setListData();
  }, [allowNotifications]);

  const setListData = () => {
    const newData = [...notificationSettingData];
    newData.forEach(item => {
      item.toggleValue =
        (allowNotifications && allowNotifications[item?.identifier]) || false;
    });
    setData(newData);
  };

  const onTogglePress = (index, value) => {
    const newData = [...data];
    newData[index].toggleValue = value;
    setData(newData);

    const payloadApi = { allowNotifications: {} };
    setTimeout(() => {
      newData.map(item => {
        payloadApi.allowNotifications[item.identifier] = item.toggleValue;
      });

      console.log(payloadApi);
      dispatch(
        authEditProfile.request({
          payloadApi,
        }),
      );
    }, 200);
  };

  const renderItem = (item, index, onTogglePress) => {
    return (
      <View style={styles.row}>
        <Text style={styles.textStyle}>{item.title}</Text>
        <Switch
          value={item.toggleValue}
          onTogglePress={val => onTogglePress(index, val)}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Container headerTitle="Settings" notificationCount="2" chat>
        <FlatList
          data={data}
          renderItem={({ item, index }) =>
            renderItem(item, index, onTogglePress)
          }
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </Container>
    </View>
  );
};

export default NotificationSetting;

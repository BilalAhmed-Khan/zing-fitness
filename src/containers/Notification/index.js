import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonView, Container, FlatListApi, Text } from '../../components';
import { NotificationUtill } from '../../dataUtils';
import {
  clearAllNotification,
  getNotification,
  getNotificationData,
  getNotificationData2,
  unreadNotificationCount,
  readAllNotification,
} from '../../ducks/notification';
import { Colors } from '../../theme';
import { Util } from '../../utils';

import styles from './styles';

const Notification = () => {
  const data = useSelector(getNotificationData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllNotification.request({ payloadApi: {}, cb: () => {} }));
  }, []);
  console.log(data);
  const renderItem = ({ item, index }) => {
    const isShowDate = Util.showDateNotification(index, data);
    const style = index > 0 ? { marginTop: 0 } : {};
    return (
      <>
        {/* {isShowDate ? (
          <Text style={[styles.header, style]}>
            {Util.dayFromNow(NotificationUtill.createdAt(item))}
          </Text>
        ) : null} */}
        <ButtonView
          style={styles.messageView}
          onPress={() => {
            Util.onNotificationTap(item);
          }}>
          <Text style={styles.timeText}>
            {Util.formatDate(NotificationUtill.createdAt(item), 'HH:mm A')}
          </Text>
          <Text style={styles.messageText}>{NotificationUtill.body(item)}</Text>
        </ButtonView>
      </>
    );
  };

  return (
    <Container headerTitle="Notification">
      <>
        <FlatListApi
          showsVerticalScrollIndicator={false}
          actionType="GET_NOTIFCATION"
          selectorData={getNotificationData}
          requestAction={getNotification.request}
          renderItem={renderItem}
          // keyExtractor={item => `${item.id}`}
        />
      </>
    </Container>
  );
};

export default Notification;

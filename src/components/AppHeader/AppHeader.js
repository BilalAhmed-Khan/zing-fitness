import React from 'react';
import { View, Image, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Text, ButtonView } from '../';

import { Images } from '../../theme';
import Styles from './Styles';
import { NavigationService } from '../../utils';
import { useSelector } from 'react-redux';
import { getNotificationCount } from '../../ducks/notification';
import { getChatUnreadCount } from '../../ducks/chat';

const AppHeader = ({
  style,
  hideLogo,
  notificationCount,
  title,
  showBack,
  chat,
}) => {
  const notificationCountApi = useSelector(getNotificationCount);
  const chatCount = useSelector(getChatUnreadCount);
  return (
    <View style={[Styles.container, style]}>
      {!hideLogo && <Image source={Images.logoWithTextSmall} />}
      {showBack && (
        <Pressable
          onPress={() => NavigationService.goBack()}
          style={Styles.goBack}>
          <Image source={Images.back} />
        </Pressable>
      )}
      {title && <Text style={Styles.title}>{title}</Text>}
      <View style={Styles.iconMain}>
        {chat !== false && (
          <ButtonView
            style={Styles.icon}
            onPress={() => {
              NavigationService.navigate('TrainerChat', { isChat: true });
            }}>
            <Image source={Images.message} />
            {chatCount > 0 && (
              <View style={Styles.notiNum}>
                <Text style={Styles.notiNumText}>{chatCount}</Text>
              </View>
            )}
          </ButtonView>
        )}
        <ButtonView
          onPress={() => {
            NavigationService.navigate('Notification');
          }}>
          <Image source={Images.notification} />
          {notificationCountApi > 0 && (
            <View style={Styles.notiNum}>
              <Text style={Styles.notiNumText}>{notificationCountApi}</Text>
            </View>
          )}
        </ButtonView>
      </View>
    </View>
  );
};

AppHeader.propTypes = {
  notificationCount: PropTypes.string,
  hideLogo: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  showBack: PropTypes.bool,
};

export default AppHeader;

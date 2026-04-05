import React from 'react';
import { View, Image, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Text, ButtonView } from '../';

import { Images } from '../../theme';
import Styles from './Styles';
import { NavigationService } from '../../utils';
import { getNotificationCount } from '../../ducks/notification';
import { useSelector } from 'react-redux';
import { getChatUnreadCount } from '../../ducks/chat';

const Header = ({ title, notificationCount, chat, isBackButton = true }) => {
  const notificationCountApi = useSelector(getNotificationCount);
  const chatCount = useSelector(getChatUnreadCount);
  return (
    <View style={Styles.container}>
      {isBackButton && (
        <ButtonView
          onPress={() => NavigationService.goBack()}
          style={Styles.goBack}>
          <Image source={Images.back} />
        </ButtonView>
      )}
      <Text style={Styles.title}>{title}</Text>
      <View style={Styles.rightIcons}>
        {chat && (
          <ButtonView
            style={Styles.chatIcon}
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
        {notificationCount && (
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
        )}
      </View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  notificationCount: PropTypes.string,
  chat: PropTypes.bool,
  isBackButton: PropTypes.bool,
};

export default Header;

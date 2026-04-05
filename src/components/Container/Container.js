import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PropTypes from 'prop-types';

import { Header, TopBar } from '../';

import { Colors } from '../../theme';

import Styles from './Styles';

const Container = ({
  children,
  style,
  headerTitle,
  contentStyle,
  notificationCount,
  chat,
  isBackButton = true,
  showBar = false,
}) => {
  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={Styles.safeContainer}>
        <View style={[Styles.container, style]}>
          <StatusBar barStyle="light-content" />
          {showBar && <TopBar />}
          {headerTitle ? (
            <View style={Styles.contentContainer}>
              <Header
                title={headerTitle}
                notificationCount={notificationCount}
                chat={chat}
                isBackButton={isBackButton}
              />
              <View style={[Styles.contentChildrenContainer, contentStyle]}>
                {children}
              </View>
            </View>
          ) : (
            children
          )}
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </SafeAreaView>
    );
  }
  return (
    <View style={[Styles.container, style]}>
      <StatusBar backgroundColor={Colors.tertiary} barStyle="light-content" />
      {showBar && <TopBar />}
      {headerTitle ? (
        <View style={Styles.contentContainer}>
          <Header
            title={headerTitle}
            notificationCount={notificationCount}
            chat={chat}
            isBackButton={isBackButton}
          />
          <View style={[Styles.contentChildrenContainer, contentStyle]}>
            {children}
          </View>
        </View>
      ) : (
        children
      )}
    </View>
  );
};

Container.propTypes = {
  style: PropTypes.object,
  contentStyle: PropTypes.object,
  children: PropTypes.node,
  headerTitle: PropTypes.string,
  notificationCount: PropTypes.string,
  chat: PropTypes.bool,
  isBackButton: PropTypes.bool,
};

export default Container;

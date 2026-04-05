import React from 'react';
import { SectionList } from 'react-native';

import { Container, Loader, SettingsItem, Text } from '../../components';
import { USER_SETTINGS } from '../../config/Constants';
import { deleteAccount } from '../../ducks/auth';

import { Styles } from './Styles';

const UserSettings = () => {
  const renderTitle = ({ section: { title } }) => (
    <Text style={Styles.title}>{title}</Text>
  );
  const renderItem = ({ item }) => <SettingsItem data={item} />;
  return (
    <Container headerTitle="Settings" notificationCount="2" chat>
      <SectionList
        sections={USER_SETTINGS}
        renderSectionHeader={renderTitle}
        renderItem={renderItem}
      />
      <Loader type={['GET_HELP', 'AUTH_LOGOUT', deleteAccount.type]} />
    </Container>
  );
};

export default UserSettings;

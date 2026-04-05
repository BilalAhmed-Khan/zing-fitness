import React from 'react';
import { SectionList, View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Container, SettingsItem, Text } from '../../components';
import { USER_SETTINGS } from '../../config/Constants';

import { Styles } from './Styles';

const UserTermsAndPolicies = ({ route }) => {
  const helpdata = route?.params?.data ?? {};
  const renderTitle = ({ section: { title } }) => (
    <Text style={Styles.title}>{title}</Text>
  );
  return (
    <Container headerTitle="Term And Policies" notificationCount="2">
      <View style={Styles.webViewStyle}>
        <WebView
          style={{ backgroundColor: Colors.transparent }}
          source={{ html: helpdata?.html }}
          contentMode={'mobile'}
        />
      </View>
    </Container>
  );
};

export default UserTermsAndPolicies;

/** @format */

import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';
import { Container, ScrollViewApi } from '../../components';
import { cms, getCMSData } from '../../ducks/general';
import { Colors } from '../../theme';

const TermsAndPolices = ({ route, navigation }) => {
  const renderContent = data => {
    console.log('data ==>', data);
    return (
      <View style={styles.maincontainer}>
        <WebView
          style={{ backgroundColor: Colors.transparent }}
          source={{ html: data?.html }}
          contentMode={'mobile'}
        />
      </View>
    );
  };
  return (
    <Container headerTitle={'Terms And Polices'}>
      <ScrollViewApi
        style={styles.container}
        actionType="CMS"
        requestAction={cms.request}
        selectorData={getCMSData}
        content={renderContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </Container>
  );
};

export default TermsAndPolices;

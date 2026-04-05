import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { navigationRef } from './services/NavigationService';

import { AppNavigator } from './navigation';

import configureStore from './store';
import {
  DataHandler,
  FirebaseUtils,
  GeocodeUtil,
  NavigationService,
  NetworkInfo,
} from './utils';
import { SessionCompleteModal, TraineeAlertModal } from './modal';
import FlashMessage from 'react-native-flash-message';
import { TopBar } from './components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleProfileRequestConfig } from './config/SocialLogin';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CLIENT_SECRET_KEY } from './config/Constants';
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const App = () => {
  // set store state
  const [storeState, setStore] = useState(null);

  // when store is configured
  const onStoreConfigure = store => {
    //init things
    DataHandler.setStore(store);
    NetworkInfo.addNetInfoListener();

    // set store state

    GeocodeUtil.initLibrary();

    GoogleSignin.configure({
      webClientId: googleProfileRequestConfig.webClientId,
    });

    FirebaseUtils.configure();
    FirebaseUtils.registerFCMListener();
    setStore(store);
    // setTimeout(() => {
    // }, 2000);

    // hide splash
    SplashScreen.hide();
  };

  useEffect(() => {
    // configure store
    configureStore(onStoreConfigure);

    // unscribe to all things on unmount
    return () => {
      NetworkInfo.removeNetInfoListener();
    };
  }, []);

  if (storeState === null) {
    return null;
  }

  return (
    <StripeProvider
      publishableKey={CLIENT_SECRET_KEY}
      merchantIdentifier={'merchant.app.zingfitness'}>
      <Provider store={storeState}>
        <AppNavigator />
        <FlashMessage position="top" />
        <SessionCompleteModal
          ref={ref => DataHandler.setSessionCompleteModal(ref)}
        />
        <TraineeAlertModal ref={ref => DataHandler.setTraineAlertModal(ref)} />
      </Provider>
    </StripeProvider>
  );
};

export default App;

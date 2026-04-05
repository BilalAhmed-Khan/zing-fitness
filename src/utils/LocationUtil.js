// @flow
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Linking } from 'react-native';

import GeocodeUtil from './GeocodeUtil';
import DataHandler from './DataHandler';
import Util from './Util';

function getCurrentLocation(
  onLocationSelected,
  showLoader = true,
  getAddress = true,
  onLocationError,
) {
  // permission id
  const permissionId = Util.isPlatformAndroid()
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  // request location
  request(permissionId).then(result => {
    if (result === RESULTS.GRANTED) {
      // console.log('result => ', result);
      if (showLoader) {
        // DataHandler.getTopLoaderRef().show();
      }
      console.log('result => ', result);

      Geolocation.getCurrentPosition(
        position => {
          console.log('position =>', position);
          const lat = position?.coords?.latitude ?? 0;
          const lng = position?.coords?.longitude ?? 0;
          if (getAddress) {
            GeocodeUtil.getAddressObject({ lat, lng }, (info, success) => {
              console.log('info =>', info);
              if (showLoader) {
                // DataHandler.getTopLoaderRef().hide();
                // console.log('getTopLoaderRef');
              }
              if (success) {
                onLocationSelected(info);
              } else {
                onLocationError && onLocationError(info);
                Util.showMessage(info);
              }
            });
          } else {
            if (showLoader) {
              // DataHandler.getTopLoaderRef().hide();
            }
            onLocationSelected({ lat, lng });
          }
        },
        error => {
          if (showLoader) {
            // DataHandler.getTopLoaderRef().hide();
          }
          Util.showMessage(error.message);
          onLocationError && onLocationError(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
      console.log('get current location', result);
    } else if (result === RESULTS.UNAVAILABLE || result === RESULTS.BLOCKED) {
      console.log('result => ', result);

      Util.showAlertConfirm(
        'Location Service Disabled',
        'You need to enable Location Services in Settings',
        'Open Settings',
        () => {
          if (Util.isPlatformAndroid()) {
            Linking.openSettings();
          } else {
            Linking.openURL('App-Prefs:LOCATION_SERVICES');
          }
        },

        onLocationError && onLocationError('Location Permission Required'),
      );
    }
  });
}

function getTransperacyPermission() {
  console.log('getTransperacyPermission');
  // permission id
  const permissionId = PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY;
  console.log('getTransperacyPermission', permissionId);
  // request location
  request(permissionId)
    .then(result => {
      if (result === RESULTS.GRANTED) {
        console.log('result => ', result);

        console.log('get current location', result);
      } else if (result === RESULTS.UNAVAILABLE || result === RESULTS.BLOCKED) {
        console.log('result => ', result);

        Util.showAlertConfirm(
          'APP Tracking Transparency Service Disabled',
          'You need to enable Location Services in Settings',
          'Open Settings',
          () => {
            if (Util.isPlatformAndroid()) {
              Linking.openSettings();
            } else {
              Linking.openURL('App-Prefs:LOCATION_SERVICES');
            }
          },
        );
      } else {
        console.log('getTransperacyPermission => ', result);
      }
    })
    .catch(error => {
      console.log('error in request tracking permissions: ', error);
    });
}

export default {
  getCurrentLocation,
  getTransperacyPermission,
};

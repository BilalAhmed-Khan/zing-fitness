// @flow
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation, { PositionError } from 'react-native-geolocation-service';
import { Linking, Platform } from 'react-native';

import GeocodeUtil from './GeocodeUtil';
import DataHandler from './DataHandler';
import Util from './Util';

const IOS_RETRY_CODES = new Set([
  PositionError.POSITION_UNAVAILABLE,
  PositionError.TIMEOUT,
]);

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

  const locationAllowed = result =>
    result === RESULTS.GRANTED ||
    (Util.isPlatformIOS() && result === RESULTS.LIMITED);

  const reportGeoFailure = error => {
    if (showLoader) {
      // DataHandler.getTopLoaderRef().hide();
    }
    const msg =
      (error && error.message) ||
      'Could not get your location. Check that Location is enabled and try again.';
    Util.showMessage(msg);
    onLocationError && onLocationError(msg);
  };

  const deliverPosition = position => {
    console.log('position =>', position);
    const lat = position?.coords?.latitude ?? 0;
    const lng = position?.coords?.longitude ?? 0;
    if (getAddress) {
      GeocodeUtil.getAddressObject({ lat, lng }, (info, success) => {
        console.log('info =>', info);
        if (showLoader) {
          // DataHandler.getTopLoaderRef().hide();
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
  };

  const primaryOptions = {
    enableHighAccuracy: true,
    timeout: Platform.OS === 'ios' ? 20000 : 15000,
    maximumAge: 10000,
  };

  const fallbackOptions = {
    enableHighAccuracy: false,
    timeout: Platform.OS === 'ios' ? 35000 : 20000,
    maximumAge: 300000,
  };

  const requestFix = () => {
    Geolocation.getCurrentPosition(
      deliverPosition,
      error => {
        const retryIos =
          Platform.OS === 'ios' &&
          error?.code != null &&
          IOS_RETRY_CODES.has(error.code);
        if (retryIos) {
          Geolocation.getCurrentPosition(
            deliverPosition,
            err => reportGeoFailure(err),
            fallbackOptions,
          );
          return;
        }
        reportGeoFailure(error);
      },
      primaryOptions,
    );
  };

  // request location
  request(permissionId)
    .then(result => {
      console.log('location permission => ', result);

      if (locationAllowed(result)) {
        if (showLoader) {
          // DataHandler.getTopLoaderRef().show();
        }
        requestFix();
        return;
      }

      if (result === RESULTS.UNAVAILABLE || result === RESULTS.BLOCKED) {
        Util.showAlertConfirm(
          'Location Service Disabled',
          'You need to enable Location Services in Settings',
          'Open Settings',
          () => {
            Linking.openSettings();
          },
        );
        onLocationError && onLocationError('Location Permission Required');
        return;
      }

      Util.showMessage(
        result === RESULTS.DENIED
          ? 'Location permission was denied. Enable it in Settings to pick your location.'
          : 'Location permission is required to use this feature.',
      );
      onLocationError && onLocationError('Location Permission Required');
    })
    .catch(err => {
      console.warn('Location permission request', err);
      Util.showMessage('Could not request location permission.');
      onLocationError && onLocationError(err?.message);
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
            Linking.openSettings();
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

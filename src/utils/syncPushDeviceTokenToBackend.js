import { create } from 'apisauce';

import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  API_UPDATE_PROFILE,
  X_API_TOKEN,
} from '../config/WebServices';
import DataHandler from './DataHandler';

/** Standalone apisauce instance so FirebaseUtils does not import ApiSauce (would cycle via utils barrel). */
const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

function readLocationFromStore() {
  const s = DataHandler.getStore()?.getState?.();
  return s?.auth?.userCurrentLocationObj ?? [];
}

/**
 * Persists refreshed FCM token after login. Mirrors latitude/longitude enrichment in ApiSauce.callRequest.
 * @returns {Promise<boolean>} true if HTTP success
 */
export async function syncPushDeviceTokenToBackend(deviceToken, platformOs) {
  const state = DataHandler.getStore()?.getState?.() ?? {};
  const accessToken = state.auth?.data?.accessToken ?? '';
  const t = typeof deviceToken === 'string' ? deviceToken.trim() : '';
  if (!accessToken || !t) {
    return false;
  }

  const payload = { deviceToken: t, platform: platformOs };
  const currentLocation = readLocationFromStore();
  if (currentLocation.length > 0) {
    if (payload.currentLongitude == null && payload.currentLatitude == null) {
      payload.currentLongitude = currentLocation[0];
      payload.currentLatitude = currentLocation[1];
    }
  }

  const headers = {
    [X_API_TOKEN]: accessToken,
    'Content-Type': 'application/json',
  };

  try {
    const response = await api.put(API_UPDATE_PROFILE.route, payload, {
      headers,
    });
    if (__DEV__ && API_LOG) {
      console.log(
        '[FCM] syncPushDeviceTokenToBackend response ok:',
        response.ok,
      );
    }
    return !!response.ok;
  } catch (e) {
    if (__DEV__) {
      console.warn('[FCM] syncPushDeviceTokenToBackend:', e?.message ?? e);
    }
    return false;
  }
}

import { create } from 'apisauce';

import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  REQUEST_TYPE,
  X_API_TOKEN,
  API_UPLOAD_FILE,
} from '../config/WebServices';
import {
  authUserLogout,
  getUserCurrentLocationObj,
  getUserToken,
} from '../ducks/auth';
// import { getUserToken } from "../ducks/auth";

import { Util, DataHandler, NavigationService } from '../utils';

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

export async function callRequestFileUpload(uri) {
  const payload = new FormData();
  const photo = { uri: uri, type: 'image/jpeg', name: 'image.jpg' };
  payload.append('file', photo);
  const url = API_UPLOAD_FILE;
  const headers = {};

  console.log('callRequestFileUpload ==>', payload);
  const { route, access_token_required } = url;
  // set X-API-TOKEN
  // if (access_token_required) {
  //   const token = getUserToken(DataHandler.getStore().getState());
  //   headers[X_API_TOKEN] = token;
  // }

  // init header object
  const headerObject = { headers };

  // init responseoc
  let response = await api.post(route, payload, headerObject);

  // log web service response
  if (__DEV__ && API_LOG) {
    console.log('url', url);
    console.log('response', response);
    console.log('payload', payload);
    console.log('headers', headers);
  }

  return handleResponse(response, headers);
}

async function callRequest(url, payload, headers = {}, parameter = '') {
  // get attributes from url

  const { type, access_token_required } = url;

  // set X-API-TOKEN
  if (access_token_required) {
    const token = getUserToken(DataHandler.getStore().getState());
    const currentLocation = getUserCurrentLocationObj(
      DataHandler.getStore().getState(),
    );
    headers[X_API_TOKEN] = token;
    if (currentLocation.length > 0) {
      payload.currentLongitude = currentLocation[0];
      payload.currentLatitude = currentLocation[1];
      // payload.currentLongitude = -122.4064973;
      // payload.currentLatitude = 37.785868;
    }
  }

  const route =
    parameter && parameter !== '' ? url.route + '/' + parameter : url.route;

  headers['Content-Type'] = 'application/json';

  // init header object
  const headerObject = { headers };

  // init responseoc
  let response;

  // on type send request
  switch (type) {
    case REQUEST_TYPE.GET:
      response = await api.get(route, payload, headerObject);
      break;
    case REQUEST_TYPE.POST:
      response = await api.post(route, payload, headerObject);
      break;
    case REQUEST_TYPE.DELETE:
      response = await api.delete(
        route,
        {},
        { data: payload, ...headerObject },
      );
      //response = await api.delete(route, payload, headerObject);
      break;
    case REQUEST_TYPE.PUT:
      response = await api.put(route, payload, headerObject);
      break;
    case REQUEST_TYPE.PATCH:
      response = await api.patch(route, payload, headerObject);
      break;
    default:
      response = await api.get(route, payload, headerObject);
  }

  // log web service response
  if (__DEV__ && API_LOG) {
    console.log('url', url);
    console.log('response', response);
    console.log('payload', payload);
    console.log('headers', headers);
    console.log('route', route);
  }

  return handleResponse(response, headers);
}

function handleResponse(response, headers) {
  return new Promise((resolve, reject) => {
    // network error  internet not working
    const isNetWorkError = response.problem === 'NETWORK_ERROR';
    // network error  internet not working
    const isClientError = response.problem === 'CLIENT_ERROR';
    // kick user from server
    const status = response?.status ?? 500;
    const isKickUser = status === 403;
    // if response is valid
    const isResponseValid =
      response.ok && Util.isNotEmpty(response.data) ? true : false;

    if (isResponseValid) {
      resolve(response.data);
    } else if (isNetWorkError) {
      if (DataHandler.getIsInternetConnected()) {
        reject({
          message:
            'We are unable to connect to our server, please try again later.',
          statusCode: status,
        });
      } else {
        reject({
          message:
            'No internet connection. Make sure Wi-Fi or cellular data is turned on, then try again.',
          statusCode: status,
        });
      }
    } else if (isKickUser) {
      Util.showMessage(
        'Your session has been expired! re-login',
        'error',
        10000,
      );
      DataHandler.getStore().dispatch(authUserLogout.success({}));
      NavigationService.reset('UserRoleSelection');
      // NavigationService.reset('Login');
    } else if (isClientError) {
      reject({
        message:
          response.data &&
          response.data.message &&
          typeof response.data.message === 'string'
            ? response.data.message
            : 'We are unable to connect to our server, please try again later.',
        statusCode: status,
      });
    } else {
      reject({
        message:
          'We are unable to connect to our server, please try again later.',
        statusCode: status,
      });
    }
  });
}

export { callRequest };

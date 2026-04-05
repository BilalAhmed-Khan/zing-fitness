import io from 'socket.io-client';
import { SOCKET_URL } from '../config/WebServices';
import { getUserToken } from '../ducks/auth';
import DataHandler from './DataHandler';
// import Toast from 'utils/Helpers/toastr';

/*
 * I just went through all of my connection settings again and I must have had a typo somewhere.
 * When I set pingTimeout and pingInterval on the server, the client appears to respect that even in Chrome.
 * If anyone else is having problems and wants to test this, it helps to set localStorage.debug = 'engine.io-client:socket' in your browser.
 * This will make ping/pong messages show in the console.
 */

/* eslint-disable import/no-mutable-export */
let socket = null;
let socketPromise = null;

export function disconnect() {
  if (socket) {
    socket.disconnect();
    socket = null;
    socketPromise = null;
  }
}

export function connect(param) {
  console.log('socket connecting', !socketPromise);
  // const { SOCKET_URL } = process.env;
  if (!socketPromise) {
    console.log('INsocketPromise connecting', !socketPromise);
    socketPromise = new Promise((resolve, reject) => {
      const token =
        getUserToken(DataHandler.getStore()?.getState()) ??
        'ae74657a-33cf-445f-8500-7145176b9612';
      // const token = 'ae74657a-33cf-445f-8500-7145176b9612"';
      console.log('token ==>', token);
      const queryParams = token ? { token } : {};
      if (param) queryParams.param = param;
      socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: queryParams,
        upgrade: false,
      });
      console.log('socket', socket);

      socket
        .on('connect', () => {
          console.log('socketConnected', socket);
          resolve(socket);
        })
        .on('disconnect', reason => {
          // console.log(reason);
          if (reason === 'io server disconnect') {
            // Toast({ title: 'Session Expired', msg: 'You are logged out. Please log-in again.', type: 'error' });

            reject(socket);
            // document.getElementById('hidden-logout-link').click();
          }
          socketPromise = null;
        });
    });
    return socketPromise;
  }

  return socketPromise;
}

export default connect;

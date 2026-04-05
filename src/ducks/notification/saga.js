import { take, put, fork, call } from 'redux-saga/effects';
import _ from 'lodash';
import {
  API_CLEAR_ALL_NOTIFICATION,
  API_GET_DASHBOARD,
  API_GET_NOTIFICATION,
  API_NOTIFICATION_UNREAD_COUNT,
  API_READ_ALL_NOTIFICATION,
} from '../../config/WebServices';
import { callRequest } from '../../utils/ApiSauce';

import {
  clearAllNotification,
  getNotification,
  readAllNotification,
  unreadNotificationCount,
} from '.';
import { Util } from '../../utils';

function* watchGetNotification() {
  while (true) {
    const { payload } = yield take(getNotification.request);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_NOTIFICATION,
        payloadApi,
      );
      yield put(
        getNotification.success({
          data: response?.data?.data,
          reset,
          page: response?.data.pagination,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getNotification.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchClearAllNotification() {
  while (true) {
    const { payload } = yield take(clearAllNotification.request);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_CLEAR_ALL_NOTIFICATION,
        payloadApi,
      );
      yield put(
        clearAllNotification.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        clearAllNotification.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchReadAllNotification() {
  while (true) {
    const { payload } = yield take(readAllNotification.request);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_READ_ALL_NOTIFICATION,
        payloadApi,
      );
      yield put(
        readAllNotification.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        readAllNotification.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetunreadNotificationCount() {
  while (true) {
    const { payload } = yield take(unreadNotificationCount.request);
    const { payloadApi, cb, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_NOTIFICATION_UNREAD_COUNT,
        payloadApi,
      );
      yield put(
        unreadNotificationCount.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        unreadNotificationCount.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchGetNotification);
  yield fork(watchClearAllNotification);
  yield fork(watchGetunreadNotificationCount);
  yield fork(watchReadAllNotification);
}

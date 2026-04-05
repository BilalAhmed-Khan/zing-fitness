import { take, put, fork, call } from 'redux-saga/effects';
import _ from 'lodash';
import {
  API_GET_CLASSES,
  API_GET_DASHBOARD,
  API_GET_TRAINER_DASHBOARD,
  API_WITHDRAW,
  API_WITHDRAW_LISTING,
} from '../../config/WebServices';
import { callRequest } from '../../utils/ApiSauce';

import {
  getDashboard,
  getTrainerDashboard,
  getTrasactionListing,
  withdraw,
} from '.';
import { Util } from '../../utils';

function* watchGetDashboard() {
  while (true) {
    const { payload } = yield take(getDashboard.request.type);
    const { payloadApi, cb, identifier, reset } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(callRequest, API_GET_DASHBOARD, {});
      yield put(
        getDashboard.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getDashboard.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetTrainerDashboard() {
  while (true) {
    const { payload } = yield take(getTrainerDashboard.request.type);
    const { payloadApi, cb, identifier, reset } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(callRequest, API_GET_TRAINER_DASHBOARD, {});
      yield put(
        getTrainerDashboard.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getTrainerDashboard.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchWithdraw() {
  while (true) {
    const { payload } = yield take(withdraw.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_WITHDRAW, {});
      yield put(
        withdraw.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        withdraw.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetTransactionListing() {
  while (true) {
    const { payload } = yield take(getTrasactionListing.request);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_WITHDRAW_LISTING,
        payloadApi,
      );
      yield put(
        getTrasactionListing.success({
          data: response?.data?.data,
          identifier,
          reset,
          page: response?.data.pagination,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getTrasactionListing.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchGetDashboard);
  yield fork(watchGetTrainerDashboard);
  yield fork(watchWithdraw);
  yield fork(watchGetTransactionListing);
}

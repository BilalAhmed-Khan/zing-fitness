import { take, put, fork, call } from 'redux-saga/effects';

import {
  API_CMS,
  API_GET_HELP,
  API_SETTING,
  API_STATES,
  API_TEST_LISTING,
} from '../../config/WebServices';
import { Util } from '../../utils';
import { callRequest } from '../../utils/ApiSauce';

import { testList, cms, getStates, getHelp, getSetting } from './';

// simple scroll view
function* watchCMS() {
  while (true) {
    const { payload } = yield take(cms.request.type);
    const { payloadApi } = payload;
    try {
      const response = yield call(callRequest, API_CMS, {});
      yield put(
        cms.success({
          data: response?.data,
        }),
      );
      // Util.showMessage('');
    } catch (error) {
      yield put(cms.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetHelp() {
  while (true) {
    const { payload } = yield take(getHelp.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_GET_HELP, {});
      yield put(
        getHelp.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
      // Util.showMessage('');
    } catch (error) {
      yield put(getHelp.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetStates() {
  while (true) {
    const { payload } = yield take(getStates.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_STATES, {});
      yield put(
        getStates.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(getStates.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetSetting() {
  while (true) {
    const { payload } = yield take(getSetting.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_SETTING, {});
      yield put(
        getSetting.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(getSetting.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchCMS);
  yield fork(watchGetStates);
  yield fork(watchGetHelp);
  yield fork(watchGetSetting);
}

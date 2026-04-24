import { take, put, fork, call } from 'redux-saga/effects';
import _ from 'lodash';
import {
  API_ADD_TRAINER_BREAK_TIME,
  API_DELETE_TRAINER_BREAK_TIME,
  API_GET_FAVIOURITE_TRAINER,
  API_GET_MY_TRAINER,
  API_GET_PROFILE,
  API_GET_TRAINER_BREAK_TIME,
  API_GET_TRAINER_LISTING,
  API_GET_TRAINER_SESSION,
} from '../../config/WebServices';
import { callRequest } from '../../utils/ApiSauce';

import {
  addBreakTimes,
  deleteTrainerBreakTimes,
  faviouriteTrainers,
  getTrainerBreakTimes,
  getTrainerListing,
  getTrainerProfile,
  getTrainerSession,
  myTrainers,
} from '.';
import { Util } from '../../utils';
import { SessionUtill } from '../../dataUtils';

function* watchGetTrainerListing() {
  while (true) {
    const { payload } = yield take(getTrainerListing.request.type);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_TRAINER_LISTING,
        payloadApi,
      );
      yield put(
        getTrainerListing.success({
          data: response?.data?.data,
          identifier,
          reset,
          page: response?.data?.pagination,
        }),
      );
      cb?.(response?.data.data);
    } catch (error) {
      yield put(
        getTrainerListing.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      // Util.showMessage(error.message);
    }
  }
}

function* watchGetTrainerProfile() {
  while (true) {
    const { payload } = yield take(getTrainerProfile.request.type);
    const { payloadApi, cb, identifier } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(callRequest, API_GET_PROFILE, {}, {}, id);
      yield put(
        getTrainerProfile.success({
          data: response?.data,
          identifier,
          id,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getTrainerProfile.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetTrainerSession() {
  while (true) {
    const { payload } = yield take(getTrainerSession.request);
    const { payloadApi, cb, identifier, apiPayload = {} } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(
        callRequest,
        API_GET_TRAINER_SESSION,
        apiPayload,
        {},
        id,
      );
      const sessionData = SessionUtill.mergeAvailableDateTimeSlots(
        response?.data,
      );
      yield put(
        getTrainerSession.success({
          data: sessionData,
          identifier,
          id,
        }),
      );
      cb?.(sessionData);
    } catch (error) {
      yield put(
        getTrainerSession.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetMyTrainees() {
  while (true) {
    const { payload } = yield take(myTrainers.request.type);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(callRequest, API_GET_MY_TRAINER, payloadApi);
      yield put(
        myTrainers.success({
          data: response?.data,
          identifier,
          reset,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        myTrainers.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      // Util.showMessage(error.message);
    }
  }
}

function* watchGetFaviouriteTrainer() {
  while (true) {
    const { payload } = yield take(faviouriteTrainers.request.type);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_FAVIOURITE_TRAINER,
        payloadApi,
      );
      yield put(
        faviouriteTrainers.success({
          data: response?.data,
          identifier,
          reset,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        faviouriteTrainers.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      // Util.showMessage(error.message);
    }
  }
}

function* watchGetTraineeBreakTimes() {
  while (true) {
    const { payload } = yield take(getTrainerBreakTimes.request);
    const { payloadApi, cb, reset } = payload;

    try {
      const response = yield call(
        callRequest,
        API_GET_TRAINER_BREAK_TIME,
        payloadApi,
      );
      yield put(
        getTrainerBreakTimes.success({
          data: response?.data?.data,
          page: response?.data?.pagination,
          reset,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getTrainerBreakTimes.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchAddTraineeBreakTimes() {
  while (true) {
    const { payload } = yield take(addBreakTimes.request);
    const { payloadApi, cb } = payload;

    try {
      const response = yield call(
        callRequest,
        API_ADD_TRAINER_BREAK_TIME,
        payloadApi,
      );
      yield put(
        addBreakTimes.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        addBreakTimes.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchDeleteTraineeBreakTimes() {
  while (true) {
    const { payload } = yield take(deleteTrainerBreakTimes.request);
    const { payloadApi, cb, reset } = payload;

    try {
      const response = yield call(
        callRequest,
        API_DELETE_TRAINER_BREAK_TIME,
        {},
        {},
        payloadApi?.id ?? '',
      );
      yield put(
        deleteTrainerBreakTimes.success({
          data: response?.data,
          id: payloadApi?.id,
          reset,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        deleteTrainerBreakTimes.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchGetTrainerListing);
  yield fork(watchGetTrainerProfile);
  yield fork(watchGetTrainerSession);
  yield fork(watchGetFaviouriteTrainer);
  yield fork(watchGetMyTrainees);
  yield fork(watchGetTraineeBreakTimes);
  yield fork(watchAddTraineeBreakTimes);
  yield fork(watchDeleteTraineeBreakTimes);
}

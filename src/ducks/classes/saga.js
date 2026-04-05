import { take, put, fork, call } from 'redux-saga/effects';
import _ from 'lodash';
import {
  API_CREATE_CLASSES,
  API_DELETE_CLASSES,
  API_GET_CLASSES,
  API_GET_SESSION,
  API_UPDATE_CLASSES,
} from '../../config/WebServices';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import { getUserRole } from '../general';

import { getClasess, createClasess, deleteClases, updateClasess } from '.';
import { Util } from '../../utils';

function* watchGetClasess() {
  while (true) {
    const { payload } = yield take(getClasess.request.type);
    const { payloadApi, cb, identifier, reset } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(callRequest, API_GET_CLASSES, {}, {}, id);
      yield put(
        getClasess.success({
          data: response?.data,
          identifier,
          reset,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getClasess.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchCreateClasess() {
  while (true) {
    const { payload } = yield take(createClasess.request.type);
    const { payloadApi, cb } = payload;

    try {
      if (!_.isEmpty(payloadApi?.images)) {
        let uploadImage = [];
        for (let i = 0; i < payloadApi?.images.length; i++) {
          const response = yield call(
            callRequestFileUpload,
            payloadApi?.images[i],
          );
          uploadImage.push(response?.data?.url);
        }
        payloadApi.images = uploadImage;
      }
      const response = yield call(callRequest, API_CREATE_CLASSES, payloadApi);
      yield put(
        createClasess.success({
          data: response?.data,
        }),
      );
      Util.showMessage('Class has been created sucessfully ', 'sucess');
      cb?.(response?.data);
    } catch (error) {
      yield put(
        createClasess.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchUpdateClasess() {
  while (true) {
    const { payload } = yield take(updateClasess.request.type);
    const { payloadApi, cb, id } = payload;

    try {
      if (!_.isEmpty(payloadApi?.images)) {
        let uploadImage = [];
        for (let i = 0; i < payloadApi?.images.length; i++) {
          const response = yield call(
            callRequestFileUpload,
            payloadApi?.images[i],
          );
          uploadImage.push(response?.data?.url);
        }
        payloadApi.images = uploadImage;
      }
      const response = yield call(
        callRequest,
        API_UPDATE_CLASSES,
        payloadApi,
        {},
        id,
      );
      yield put(
        updateClasess.success({
          data: response?.data,
          id,
        }),
      );
      Util.showMessage('Class has been updated sucessfully ', 'sucess');
      cb?.(response?.data);
    } catch (error) {
      yield put(
        updateClasess.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchDeleteClasess() {
  while (true) {
    const { payload } = yield take(deleteClases.request.type);
    const { payloadApi, cb } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(callRequest, API_DELETE_CLASSES, {}, {}, id);
      yield put(
        deleteClases.success({
          data: response?.data,
          id,
        }),
      );
      Util.showMessage('Class has been deleted sucessfully', 'sucess');
      cb?.(response?.data);
    } catch (error) {
      yield put(
        deleteClases.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchGetClasess);
  yield fork(watchCreateClasess);
  yield fork(watchDeleteClasess);
  yield fork(watchUpdateClasess);
}

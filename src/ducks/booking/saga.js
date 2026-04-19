import { take, put, fork, call } from 'redux-saga/effects';
import _ from 'lodash';
import {
  API_ACCEPT_TRAINERS,
  API_ADD_PARTICIPANTS,
  API_BOOKING_DETAILS,
  API_BOOKING_HISTORY,
  API_BOOKING_LISTING,
  API_BOOK_A_CLASS,
  API_BOOK_A_SESSION,
  API_CANCEL_BOOKING,
  API_DELETE_PARTICIPANTS,
  API_END_A_CLASS,
  API_END_A_SESSION,
  API_FIND_TRAINERS,
  API_PAYMENT_INTENT,
  API_REJECT_TRAINERS,
  API_SESSION_RATING,
  API_START_A_CLASS,
  API_START_A_SESSION,
  API_UPDATE_PARTICIPANTS,
} from '../../config/WebServices';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';

import {
  acceptTrainerRequest,
  addParticipants,
  bookClass,
  bookingDetails,
  bookingHistory,
  bookingListing,
  bookSession,
  cancelBooking,
  createRealBookingIntent,
  deleteParticipants,
  endBooking,
  endClass,
  findTrainer,
  rateSession,
  rejectTrainerRequest,
  startBooking,
  startClass,
  updateParticipants,
} from '.';
import { Util } from '../../utils';
import { unwrapBookingPaymentResponse } from '../../utils/StripePaymentUtil';

function* watchBookASession() {
  while (true) {
    const { payload } = yield take(bookSession.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_BOOK_A_SESSION, payloadApi);
      const bookingPayload = unwrapBookingPaymentResponse(response);
      yield put(
        bookSession.success({
          data: bookingPayload,
        }),
      );
      cb?.(bookingPayload);
    } catch (error) {
      yield put(
        bookSession.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchBookAClass() {
  while (true) {
    const { payload } = yield take(bookClass.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_BOOK_A_CLASS, payloadApi);
      const bookingPayload = unwrapBookingPaymentResponse(response);
      yield put(
        bookClass.success({
          data: bookingPayload,
        }),
      );
      cb?.(bookingPayload);
    } catch (error) {
      yield put(
        bookClass.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchStartSession() {
  while (true) {
    const { payload } = yield take(startBooking.request);
    const { payloadApi, cb } = payload;
    const id = payloadApi.id;
    try {
      const response = yield call(callRequest, API_START_A_SESSION, {}, {}, id);
      yield put(
        startBooking.success({
          data: response?.data,
          id: id,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        startBooking.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchStartClass() {
  while (true) {
    const { payload } = yield take(startClass.request);
    const { payloadApi, cb } = payload;
    const id = payloadApi.id;
    try {
      const response = yield call(callRequest, API_START_A_CLASS, {}, {}, id);
      yield put(
        startClass.success({
          data: response?.data,
          id: id,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        startClass.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchEndClass() {
  while (true) {
    const { payload } = yield take(endClass.request);
    const { payloadApi, cb } = payload;
    const id = payloadApi.id;
    try {
      const response = yield call(callRequest, API_END_A_CLASS, {}, {}, id);
      yield put(
        endClass.success({
          data: response?.data,
          id: id,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        endClass.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchEndSession() {
  while (true) {
    const { payload } = yield take(endBooking.request);
    const { payloadApi, cb } = payload;
    const id = payloadApi.id;
    try {
      const response = yield call(callRequest, API_END_A_SESSION, {}, {}, id);
      yield put(
        endBooking.success({
          data: response?.data,
          id: id,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        endBooking.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetBooking() {
  while (true) {
    const { payload } = yield take(bookingListing.request);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(callRequest, API_BOOKING_LISTING, payloadApi);
      yield put(
        bookingListing.success({
          data: response?.data?.data,
          identifier,
          reset,
          page: response?.data.pagination,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        bookingListing.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      // Util.showMessage(error.message);
    }
  }
}

function* watchGetBookingHistory() {
  while (true) {
    const { payload } = yield take(bookingHistory.request);
    const { payloadApi, cb, identifier, reset } = payload;
    try {
      const response = yield call(callRequest, API_BOOKING_HISTORY, payloadApi);
      yield put(
        bookingHistory.success({
          data: response?.data?.data,
          identifier,
          reset,
          page: response?.data.pagination,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        bookingHistory.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchAddParticipants() {
  while (true) {
    const { payload } = yield take(addParticipants.request);
    const { payloadApi, cb } = payload;
    try {
      if (payloadApi?.image !== '') {
        const response = yield call(callRequestFileUpload, payloadApi.image);
        payloadApi.image = response?.data?.url;
      }
      const response = yield call(
        callRequest,
        API_ADD_PARTICIPANTS,
        payloadApi,
      );
      yield put(
        addParticipants.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        addParticipants.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchUpdateParticipants() {
  while (true) {
    const { payload } = yield take(updateParticipants.request);
    const { payloadApi, cb, id } = payload;
    try {
      if (payloadApi?.image !== '') {
        const response = yield call(callRequestFileUpload, payloadApi.image);
        payloadApi.image = response?.data?.url;
      }
      const response = yield call(
        callRequest,
        API_UPDATE_PARTICIPANTS,
        payloadApi,
        {},
        id,
      );
      yield put(
        updateParticipants.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        updateParticipants.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchDeleteParticipants() {
  while (true) {
    const { payload } = yield take(deleteParticipants.request);
    const { payloadApi, cb } = payload;
    const id = payloadApi.id;
    delete payloadApi.id;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_PARTICIPANTS,
        payloadApi,
        {},
        id,
      );
      yield put(
        deleteParticipants.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        deleteParticipants.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetBookingDetails() {
  while (true) {
    const { payload } = yield take(bookingDetails.request);
    const { payloadApi, cb, identifier } = payload;
    const id = payloadApi.id;
    try {
      const response = yield call(callRequest, API_BOOKING_DETAILS, {}, {}, id);
      yield put(
        bookingDetails.success({
          data: response?.data,
          identifier,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        bookingDetails.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchRateBooking() {
  while (true) {
    const { payload } = yield take(rateSession.request);
    const { payloadApi, cb, identifier } = payload;
    const id = payloadApi.id;
    delete payloadApi.id;
    try {
      const response = yield call(
        callRequest,
        API_SESSION_RATING,
        payloadApi,
        {},
        id,
      );
      yield put(
        rateSession.success({
          data: response?.data,
          identifier,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        rateSession.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchFindTrainer() {
  while (true) {
    const { payload } = yield take(findTrainer.request);
    const { payloadApi, cb } = payload;
    delete payloadApi.id;
    try {
      const response = yield call(callRequest, API_FIND_TRAINERS, payloadApi);
      yield put(
        findTrainer.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        findTrainer.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchCancelBooking() {
  while (true) {
    const { payload } = yield take(cancelBooking.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_CANCEL_BOOKING, payloadApi);
      yield put(
        cancelBooking.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        cancelBooking.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchAcceptTrainerRequest() {
  while (true) {
    const { payload } = yield take(acceptTrainerRequest.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_ACCEPT_TRAINERS,
        {},
        {},
        payloadApi.id,
      );
      yield put(
        acceptTrainerRequest.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        acceptTrainerRequest.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchRejectTrainerRequest() {
  while (true) {
    const { payload } = yield take(rejectTrainerRequest.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_REJECT_TRAINERS,
        {},
        {},
        payloadApi.id,
      );
      yield put(
        rejectTrainerRequest.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        rejectTrainerRequest.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}
function* watchCreatePayment() {
  while (true) {
    const { payload } = yield take(createRealBookingIntent.request);
    const { payloadApi, cb } = payload;
    const id = payloadApi.id;
    delete payloadApi.id;
    try {
      const response = yield call(
        callRequest,
        API_PAYMENT_INTENT,
        payloadApi,
        {},
        id,
      );
      const intentPayload = unwrapBookingPaymentResponse(response);
      yield put(
        createRealBookingIntent.success({
          data: intentPayload,
        }),
      );
      cb?.(intentPayload);
    } catch (error) {
      yield put(
        createRealBookingIntent.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchBookASession);
  yield fork(watchAddParticipants);
  yield fork(watchStartSession);
  yield fork(watchEndSession);
  yield fork(watchGetBooking);
  yield fork(watchGetBookingHistory);
  yield fork(watchGetBookingDetails);
  yield fork(watchBookAClass);
  yield fork(watchStartClass);
  yield fork(watchEndClass);
  yield fork(watchRateBooking);
  yield fork(watchFindTrainer);
  yield fork(watchAcceptTrainerRequest);
  yield fork(watchRejectTrainerRequest);
  yield fork(watchCreatePayment);
  yield fork(watchUpdateParticipants);
  yield fork(watchDeleteParticipants);
  yield fork(watchCancelBooking);
}

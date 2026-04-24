import { channel } from 'redux-saga';
import { take, put, fork, call } from 'redux-saga/effects';
import _ from 'lodash';
import {
  API_CREATE_PASSWORD,
  API_EMAIL_VERIFCATION,
  API_FORGET_PASSWORD,
  API_LOGIN,
  API_SIGNUP,
  API_EXTERNAL_LOGIN,
  API_USER_PROFILESETUP,
  API_RESEND_OTP,
  API_EMAIL_REGISTRATION_VERIFCATION,
  API_LOGOUT,
  GET_PROFILE,
  API_CHANGE_PASSWORD,
  API_TOGGLE_NOTIFICATION,
  API_GET_TRAINEE_CATEGORY,
  API_GET_TRAINEE_CERTIFICATE,
  API_ADD_TRAINEE_CERTIFICATE,
  API_SELECT_TRAINEE_CATEGORY,
  API_CREATE_SESSION,
  API_GET_SESSION,
  API_GET_PROFILE,
  API_UPDATE_PROFILE,
  API_GET_BANK_ACCOUNT,
  API_CREATE_BANK_ACCOUNT,
  API_SUPPORT,
  API_DELETE_TRAINEE_CERTIFICATE,
  API_UPDATE_TRAINEE_CERTIFICATE,
  API_DELETE_ACCOUNT,
  API_APPLE_TOKEN,
} from '../../config/WebServices';
import { API_TRAINER_SIGNUP, API_USER_SIGNUP } from '../../config/WebServices';
import { DataHandler, FirebaseUtils, Util } from '../../utils';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import { getUserRole } from '../general';

import {
  authResetPassword,
  authEmailVerification,
  authForgetPassword,
  authLogin,
  authSignUp,
  externalLogin,
  userProfileSetup,
  authResendOTP,
  authUserLogout,
  authGetProfile,
  authChangePassword,
  imageAction,
  notificationToggle,
  getTrainerCertificate,
  addTrainerCertificate,
  getTrainerCategories,
  selectCategories,
  createSession,
  getSession,
  getClasess,
  createClasess,
  authEditProfile,
  getBankAccount,
  createBankAccount,
  contactSupport,
  deleteTrainerCertificate,
  updateCertificate,
  deleteAccount,
  appleToken,
  updateLocation,
} from './';

function* watchSignUp() {
  while (true) {
    const { payload } = yield take(authSignUp.request.type);
    const { payloadApi, cb } = payload;
    if (!_.isEmpty(payloadApi?.image)) {
      const response = yield call(callRequestFileUpload, payloadApi.image);
      payloadApi.image = response?.data?.url;
    }
    if (!_.isEmpty(payloadApi?.cropImage)) {
      const response = yield call(callRequestFileUpload, payloadApi.cropImage);
      payloadApi.cropImage = response?.data?.url;
    }
    payloadApi.deviceToken = yield FirebaseUtils.getTokenPromise();
    const isTrainee = getUserRole(DataHandler.getStore().getState());
    try {
      const response = yield call(
        callRequest,
        isTrainee ? API_TRAINER_SIGNUP : API_USER_SIGNUP,
        payloadApi,
      );
      yield put(authSignUp.success({}));
      cb?.(response?.data);
    } catch (error) {
      yield put(authSignUp.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchLogin() {
  while (true) {
    const { payload } = yield take(authLogin.request.type);
    const { payloadApi, cb } = payload;
    payloadApi.deviceToken = yield FirebaseUtils.getTokenPromise();
    try {
      const response = yield call(callRequest, API_LOGIN, payloadApi);
      yield put(authLogin.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(authLogin.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchForgetPassword() {
  while (true) {
    const { payload } = yield take(authForgetPassword.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_FORGET_PASSWORD, payloadApi);
      yield put(authForgetPassword.success({}));
      cb?.(response?.data);
    } catch (error) {
      yield put(authForgetPassword.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchCreatePassword() {
  while (true) {
    const { payload } = yield take(authResetPassword.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_CREATE_PASSWORD, payloadApi);
      yield put(authResetPassword.success({}));
      Util.showMessage('Password has been updated', 'sucess');
      cb?.(response?.data);
    } catch (error) {
      yield put(authResetPassword.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchEmailVerification() {
  while (true) {
    let isRegistion = false;
    const { payload } = yield take(authEmailVerification.request.type);
    const { payloadApi, cb } = payload;
    if (payloadApi?.isRegistartion) {
      isRegistion = payloadApi?.isRegistartion;
      delete payloadApi?.isRegistartion;
    }
    try {
      const response = yield call(
        callRequest,
        isRegistion
          ? API_EMAIL_REGISTRATION_VERIFCATION
          : API_EMAIL_VERIFCATION,
        payloadApi,
      );
      yield put(
        authEmailVerification.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(authEmailVerification.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetTraineeCertificate() {
  while (true) {
    const { payload } = yield take(getTrainerCertificate.request.type);
    const { payloadApi, cb, identifier, reset } = payload;

    try {
      const response = yield call(
        callRequest,
        API_GET_TRAINEE_CERTIFICATE,
        payloadApi,
      );
      yield put(
        getTrainerCertificate.success({
          data: response?.data,
          identifier,
          reset,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getTrainerCertificate.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchAddTraineeCertificate() {
  while (true) {
    const { payload } = yield take(addTrainerCertificate.request.type);
    const { payloadApi, cb } = payload;
    try {
      if (!_.isEmpty(payloadApi?.certificateFileUrl)) {
        const response = yield call(
          callRequestFileUpload,
          payloadApi.certificateFileUrl,
        );
        payloadApi.certificateFileUrl = response?.data?.url;
      }
      console.log('certificateFileUrl', payload);
      const response = yield call(
        callRequest,
        API_ADD_TRAINEE_CERTIFICATE,
        payloadApi,
      );
      yield put(
        addTrainerCertificate.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
      Util.showMessage('Certificate has been added sucessfully ', 'sucess');
    } catch (error) {
      yield put(addTrainerCertificate.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchGetTraineeCategory() {
  while (true) {
    const { payload } = yield take(getTrainerCategories.request.type);
    const { payloadApi, cb, identifier, reset } = payload;

    try {
      const response = yield call(
        callRequest,
        API_GET_TRAINEE_CATEGORY,
        payloadApi,
      );
      yield put(
        getTrainerCategories.success({
          data: response?.data,
          identifier,
          reset,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getTrainerCategories.failure({
          errorMessage: error.message,
          identifier,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchSelectTraineeCategory() {
  while (true) {
    const { payload } = yield take(selectCategories.request.type);
    const { payloadApi, cb } = payload;

    try {
      const response = yield call(
        callRequest,
        API_SELECT_TRAINEE_CATEGORY,
        payloadApi,
      );
      yield put(
        selectCategories.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        selectCategories.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchCreateSessoin() {
  while (true) {
    const { payload } = yield take(createSession.request.type);
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
      const response = yield call(callRequest, API_CREATE_SESSION, payloadApi);
      yield put(
        createSession.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        createSession.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetSessoin() {
  while (true) {
    const { payload } = yield take(getSession.request.type);
    const { payloadApi, cb } = payload;

    try {
      const response = yield call(callRequest, API_GET_SESSION, payloadApi);
      yield put(
        getSession.success({
          data: response?.data,
        }),
      );
      cb?.(response?.data);
    } catch (error) {
      yield put(
        getSession.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchGetUserProfile() {
  while (true) {
    const { payload } = yield take(authGetProfile.request.type);
    const { payloadApi, cb } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(callRequest, API_GET_PROFILE, {}, {}, id);
      yield put(authGetProfile.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(authGetProfile.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchEditUserProfile() {
  while (true) {
    const { payload } = yield take(authEditProfile.request.type);
    const { payloadApi, cb, id, faliure } = payload;
    if (!_.isEmpty(payloadApi?.image)) {
      const response = yield call(callRequestFileUpload, payloadApi.image);
      payloadApi.image = response?.data?.url;
    }
    if (!_.isEmpty(payloadApi?.cropImage)) {
      const response = yield call(callRequestFileUpload, payloadApi.cropImage);
      payloadApi.cropImage = response?.data?.url;
    }
    try {
      const response = yield call(callRequest, API_UPDATE_PROFILE, payloadApi);
      yield put(authEditProfile.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(authEditProfile.failure({ errorMessage: error.message }));
      faliure?.();
      Util.showMessage(error.message);
    }
  }
}

function* watchUpdateLocation() {
  while (true) {
    const { payload } = yield take(updateLocation.request);
    const { payloadApi, cb, id, faliure } = payload;
    try {
      const response = yield call(callRequest, API_UPDATE_PROFILE, payloadApi);
      yield put(updateLocation.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(updateLocation.failure({ errorMessage: error.message }));
      faliure?.();
      Util.showMessage(error.message);
    }
  }
}

function* watchGetBankAccount() {
  while (true) {
    const { payload } = yield take(getBankAccount.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(
        callRequest,
        API_GET_BANK_ACCOUNT,
        payloadApi,
      );
      yield put(getBankAccount.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(getBankAccount.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchCreateBankAccount() {
  while (true) {
    const { payload } = yield take(createBankAccount.request.type);
    const { payloadApi, cb } = payload;
    if (!_.isEmpty(payloadApi?.frontOfId)) {
      const response = yield call(callRequestFileUpload, payloadApi.frontOfId);
      payloadApi.frontOfId = response?.data?.url;
    }
    if (!_.isEmpty(payloadApi?.backOfId)) {
      const response = yield call(callRequestFileUpload, payloadApi.backOfId);
      payloadApi.backOfId = response?.data?.url;
    }
    try {
      const response = yield call(
        callRequest,
        API_CREATE_BANK_ACCOUNT,
        payloadApi,
      );
      yield put(createBankAccount.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(createBankAccount.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchUpdateCertificate() {
  while (true) {
    const { payload } = yield take(updateCertificate.request.type);
    const { payloadApi, cb, id } = payload;
    try {
      if (!_.isEmpty(payloadApi?.certificateFileUrl)) {
        const response = yield call(
          callRequestFileUpload,
          payloadApi.certificateFileUrl,
        );
        payloadApi.certificateFileUrl = response?.data?.url;
      }
      const response = yield call(
        callRequest,
        API_UPDATE_TRAINEE_CERTIFICATE,
        payloadApi,
        {},
        id,
      );
      yield put(
        updateCertificate.success({
          data: response?.data,
          id,
        }),
      );
      Util.showMessage('Certificate has been updated sucessfully', 'sucess');
      cb?.(response?.data);
    } catch (error) {
      yield put(
        updateCertificate.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchDeleteCertificate() {
  while (true) {
    const { payload } = yield take(deleteTrainerCertificate.request.type);
    const { payloadApi, cb } = payload;
    const id = payloadApi?.id;
    try {
      const response = yield call(
        callRequest,
        API_DELETE_TRAINEE_CERTIFICATE,
        {},
        {},
        id,
      );
      yield put(
        deleteTrainerCertificate.success({
          data: response?.data,
          id,
        }),
      );
      Util.showMessage('Certificate has been deleted sucessfully', 'sucess');
      cb?.(response?.data);
    } catch (error) {
      yield put(
        deleteTrainerCertificate.failure({
          errorMessage: error.message,
        }),
      );
      Util.showMessage(error.message);
    }
  }
}

function* watchExternalLogin() {
  while (true) {
    const { payload } = yield take(externalLogin.request.type);
    const { payloadApi, cb } = payload;
    payloadApi.deviceToken = yield FirebaseUtils.getTokenPromise();
    try {
      const response = yield call(callRequest, API_EXTERNAL_LOGIN, payloadApi);
      yield put(externalLogin.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(externalLogin.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

// function* watchResendOTP() {
//   while (true) {
//     const { payload } = yield take(authResendOTP.request.type);
//     const { payloadApi, cb } = payload;
//     try {
//       const response = yield call(callRequest, API_RESEND_OTP, payloadApi);
//       yield put(authResendOTP.success({}));
//       cb?.(response?.data);
//     } catch (error) {
//       yield put(authResendOTP.failure({ errorMessage: error.message }));
//       Util.showMessage(error.message);
//     }
//   }
// }

function* watchChangePassword() {
  while (true) {
    const { payload } = yield take(authChangePassword.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_CHANGE_PASSWORD, payloadApi);
      yield put(authChangePassword.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(authChangePassword.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}
function* watchContactSupport() {
  while (true) {
    const { payload } = yield take(contactSupport.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_SUPPORT, payloadApi);
      yield put(contactSupport.success({ data: response?.data }));
      cb?.(response?.data);
    } catch (error) {
      yield put(contactSupport.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchLogout() {
  while (true) {
    const { payload } = yield take(authUserLogout.request.type);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_LOGOUT, payloadApi);
      yield put(authUserLogout.success({}));
      cb?.(response?.data);
    } catch (error) {
      yield put(authUserLogout.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchDeleteAccount() {
  while (true) {
    const { payload } = yield take(deleteAccount.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_DELETE_ACCOUNT, payloadApi);
      yield put(deleteAccount.success({}));
      cb?.(response?.data);
    } catch (error) {
      yield put(deleteAccount.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

function* watchAppleToken() {
  while (true) {
    const { payload } = yield take(appleToken.request);
    const { payloadApi, cb } = payload;
    try {
      const response = yield call(callRequest, API_APPLE_TOKEN, payloadApi);
      yield put(appleToken.success({}));
      const applePayload = response?.data ?? response;
      cb?.(applePayload);
    } catch (error) {
      yield put(appleToken.failure({ errorMessage: error.message }));
      Util.showMessage(error.message);
    }
  }
}

export default function* root() {
  yield fork(watchSignUp);
  yield fork(watchLogin);
  yield fork(watchEmailVerification);
  yield fork(watchForgetPassword);
  yield fork(watchCreatePassword);
  yield fork(watchChangePassword);
  yield fork(watchGetTraineeCertificate);
  yield fork(watchAddTraineeCertificate);
  yield fork(watchUpdateCertificate);
  yield fork(watchGetTraineeCategory);
  yield fork(watchSelectTraineeCategory);
  yield fork(watchCreateSessoin);
  yield fork(watchGetSessoin);
  yield fork(watchEditUserProfile);
  yield fork(watchGetUserProfile);
  yield fork(watchCreateBankAccount);
  yield fork(watchGetBankAccount);
  yield fork(watchContactSupport);
  yield fork(watchDeleteCertificate);
  yield fork(watchLogout);
  yield fork(watchExternalLogin);
  yield fork(watchDeleteAccount);
  yield fork(watchAppleToken);
  yield fork(watchUpdateLocation);
}

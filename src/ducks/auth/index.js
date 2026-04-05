import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils';

// action creators
export const authSignUp = makeRequesActions('AUTH_SIGNUP');
export const authLogin = makeRequesActions('AUTH_LOGIN');
export const externalLogin = makeRequesActions('AUTH_EXTERNAL_LOGIN');
export const authEmailVerification = makeRequesActions(
  'AUTH_EMAIL_VERIFICATION',
);
export const authForgetPassword = makeRequesActions('AUTH_FORGET_PASSWORD');
export const authResetPassword = makeRequesActions('AUTH_RESET_PASSWORD');
export const authEditProfile = makeRequesActions('AUTH_EDIT_PROFILE');
export const updateLocation = makeRequesActions('UPDATE_LOCATION_PROFILE');
export const authGetProfile = makeRequesActions('AUTH_GET_PROFILE');
export const authChangePassword = makeRequesActions('AUTH_CHANGE_PASSWORD');
export const authUserLogout = makeRequesActions('AUTH_LOGOUT');
// export const authResendOTP = makeRequesActions("AUTH_RESEND_OTP");
// export const notificationToggle = makeRequesActions("NOTIFICATION_TOGGLE");

export const addTrainerCertificate = makeRequesActions(
  'ADD_TRAINER_CERTIFICATE',
);
export const updateCertificate = makeRequesActions(
  'UPDATE_TRAINER_CERTIFICATE',
);
export const deleteTrainerCertificate = makeRequesActions(
  'DELETE_TRAINER_CERTIFICATE',
);

export const getTrainerCertificate = makeRequesActions(
  'GET_TRAINER_CERTIFICATE',
);
export const getTrainerCategories = makeRequesActions('GET_TRAINER_CATEGORY');
export const selectCategories = makeRequesActions('SELECT_TRAINER_CATEGORY');
export const createSession = makeRequesActions('TRAINER_CREATE_SESSION');
export const getSession = makeRequesActions('TRAINER_GET_SESSION');
export const getBankAccount = makeRequesActions('GET_BANK_ACCOUNT');
export const createBankAccount = makeRequesActions('CREATE_BANK_ACCOUNT');
export const contactSupport = makeRequesActions('CONTACT_SUPPORT');
export const userCurrentLocation = makeAction('CURRENT_LOCATION');
export const deleteAccount = makeRequesActions('DELETE_ACCOUNT');
export const appleToken = makeRequesActions('APPLE_TOKEN');
// init state
const initalState = { data: {}, trainer: {}, userCurrentLocationObj: [] };

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(authSignUp.success, (state, action) => {});
  builder.addCase(authLogin.success, (state, action) => {
    const { data } = action.payload;
    state.data = {
      ...data,
      accessToken: data.access_token?.accessToken,
    };
  });

  builder.addCase(authUserLogout.success, (state, action) => {
    state.data = {};
    state.trainer = {};
    state.userCurrentLocationObj = [];
  });

  builder.addCase(externalLogin.success, (state, action) => {
    const { data } = action.payload;
    state.data = {
      ...data,
      accessToken: data.access_token?.accessToken,
    };
  });
  builder.addCase(authEmailVerification.success, (state, action) => {
    const { data } = action.payload;
    state.data = {
      ...data,
      accessToken: data.access_token?.accessToken,
    };
  });

  builder.addCase(getTrainerCertificate.success, (state, action) => {
    const { identifier } = action.payload;
    Util.concatDataArray(state, action, 'trainer', identifier);
  });
  builder.addCase(addTrainerCertificate.success, (state, action) => {
    const { data } = action.payload;
    if (state.trainer['TRAINER_CERTIFICATE']) {
      state.trainer['TRAINER_CERTIFICATE'].push(data);
    } else {
      state.trainer['TRAINER_CERTIFICATE'] = [data];
    }
  });
  builder.addCase(deleteTrainerCertificate.success, (state, action) => {
    const { data, id } = action.payload;
    state.trainer['TRAINER_CERTIFICATE'] = state.trainer[
      'TRAINER_CERTIFICATE'
    ]?.filter(val => val.id !== id);
  });
  builder.addCase(updateCertificate.success, (state, action) => {
    const { data, id } = action.payload;
    const index = state.trainer['TRAINER_CERTIFICATE']?.findIndex(
      val => val?.id === id,
    );
    if (index >= 0) {
      state.trainer['TRAINER_CERTIFICATE'][index] = {
        ...state.trainer['TRAINER_CERTIFICATE'][index],
        ...data,
      };
    }
  });
  builder.addCase(getTrainerCategories.success, (state, action) => {
    const { identifier } = action.payload;
    Util.concatDataArray(state, action, 'trainer', identifier);
  });
  builder.addCase(createSession.success, (state, action) => {
    const { data } = action.payload;
    if (state.data?.session) {
      state.data.session = {
        ...state.data.session,
        ...data,
      };
    } else {
      state.data.session = data;
    }
  });
  builder.addCase(selectCategories.success, (state, action) => {
    const { data } = action.payload;
    state.data.trainerCategories = data;
  });
  builder.addCase(authEditProfile.success, (state, action) => {
    const { data } = action.payload;
    state.data = {
      ...state.data,
      ...data,
    };
  });
  builder.addCase(updateLocation.success, (state, action) => {
    const { data } = action.payload;
    state.data = {
      ...state.data,
      ...data,
    };
  });
  builder.addCase(authGetProfile.success, (state, action) => {
    const { data } = action.payload;
    state.data = {
      ...state.data,
      ...data,
    };
  });
  builder.addCase(createBankAccount.success, (state, action) => {
    const { data } = action.payload;
    if (state['ACCOUNT']) {
      state['ACCOUNT'] = {
        ...state['ACCOUNT'],
        ...data,
      };
    } else {
      state['ACCOUNT'] = data;
    }
  });
  builder.addCase(getBankAccount.success, (state, action) => {
    const { data } = action.payload;
    if (state['ACCOUNT']) {
      state['ACCOUNT'] = {
        ...state['ACCOUNT'],
        ...data,
      };
    } else {
      state['ACCOUNT'] = data;
    }
  });
  builder.addCase(userCurrentLocation, (state, action) => {
    const { data } = action.payload;
    if (state.data?.address !== '') {
      state.userCurrentLocationObj = data?.cordinates ?? [];
    }
  });
  builder.addCase(deleteAccount.success, (state, action) => {
    state.data = {};
    state.trainer = {};
    state.userCurrentLocationObj = [];
  });
});

const defaultObj = {};

// // selectors
export const getUserData = state => state.auth.data ?? defaultObj;
export const getUserToken = state => state.auth?.data?.accessToken ?? '';
export const getUserToggleNotifiaction = state =>
  state.auth?.data?.allow_notifications ?? '';
export const getIdentifierAuthData = identifier => state =>
  state.auth?.[identifier] ?? '';
export const getIdentifierTrainer = identifier => state =>
  state.auth?.trainer?.[identifier] ?? '';
export const getSessionData = state => state.auth?.data?.session ?? defaultObj;
export const getTraineeCategoriesData = state =>
  state.auth?.data?.trainerCategories ?? [];
export const getUserToggles = state =>
  state.auth?.data?.allowNotifications ?? [];
export const getUserCurrentLocationObj = state =>
  state.auth?.userCurrentLocationObj ?? [];

import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils';

// action creators
export const getTrainerListing = makeRequesActions('GET_TRAINER_LISTING');
export const getTrainerProfile = makeRequesActions('GET_TRAINER_PROFILE');
export const getTrainerSession = makeRequesActions('GET_TRAINER_SESSION');
export const getTrainerBreakTimes = makeRequesActions(
  'GET_TRAINER_BREAK_TIMES',
);
export const addBreakTimes = makeRequesActions('ADD_TRAINER_BREAK_TIMES');
export const deleteTrainerBreakTimes = makeRequesActions(
  'DELETE_TRAINER_BREAK_TIMES',
);
export const myTrainers = makeRequesActions('GET_MY_TRAIENRS');
export const faviouriteTrainers = makeRequesActions('GET_FAVIOURITE_TRAIENRS');
// init state
const initalState = { data: {}, session: {}, breakTimes: [] };

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(getTrainerListing.success, (state, action) => {
    const { data, identifier } = action.payload;
    console.log(data);
    Util.concatDataArray(state, action, 'data', identifier);
  });
  builder.addCase(getTrainerProfile.success, (state, action) => {
    const { data, id } = action.payload;
    if (state.data?.[id]) {
      state.data[id] = {
        ...state.data?.[id],
        ...data,
      };
    } else {
      state.data[id] = data;
    }
  });
  builder.addCase(getTrainerSession.success, (state, action) => {
    const { data, id } = action.payload;
    if (state.session?.[id]) {
      state.session[id] = {
        ...state.session?.[id],
        ...data,
      };
    } else {
      state.session[id] = data;
    }
  });
  builder.addCase(myTrainers.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, 'data', identifier);
  });
  builder.addCase(faviouriteTrainers.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, 'data', identifier);
  });
  builder.addCase(getTrainerBreakTimes.success, (state, action) => {
    Util.concatDataArray(state, action, 'breakTimes');
  });
  builder.addCase(addBreakTimes.success, (state, action) => {
    const { data } = action.payload;
    // state.breakTimes.unshift(data);
    // Util.concatDataArray(state, action, 'breakTimes');
  });
  builder.addCase(deleteTrainerBreakTimes.success, (state, action) => {
    const { data, id } = action.payload;
    state.breakTimes = state.breakTimes.filter(val => val.id !== id);
    // Util.concatDataArray(state, action, 'breakTimes');
  });
});

const defaultObj = {};
const defaultArray = [];
// // selectors
export const getTrainerIdentifierData = identifier => state =>
  state.trainer?.data?.[identifier] ?? defaultObj;
export const getTrainerIdentifierListingData = identifier => state =>
  state.trainer?.data?.[identifier] ?? defaultArray;
export const getTrainerBreakTimesData = state =>
  state.trainer?.breakTimes ?? defaultArray;
export const getSessionIdentifierData = identifier => state =>
  state.trainer?.session?.[identifier] ?? defaultObj;

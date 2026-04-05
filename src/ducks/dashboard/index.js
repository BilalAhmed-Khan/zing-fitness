import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { get } from 'react-hook-form';
import { Util } from '../../utils';
export const withdraw = makeRequesActions('WITHDRAW');
// action creators
export const getDashboard = makeRequesActions('GET_DASHBOARD');
export const getTrainerDashboard = makeRequesActions('GET_TRAINER_DASHBOARD');
export const getTrasactionListing = makeRequesActions('GET_TRASACTION_LISTING');
// init state
const initalState = { data: {}, trainerData: {} };

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(getDashboard.success, (state, action) => {
    const { data } = action.payload;
    state.data = data;
  });
  builder.addCase(getTrainerDashboard.success, (state, action) => {
    const { data } = action.payload;
    state.trainerData = data;
  });
  builder.addCase(withdraw.success, (state, action) => {
    const { data } = action.payload;
    state.trainerData.trainerTotalAmount = 0;
  });
  builder.addCase(getTrasactionListing.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, identifier);
  });
});

const defaultObj = {};
const defaultArray = [];
// // selectors
export const getDashboardData = state => state.dashboard.data ?? defaultObj;
export const getDashboardTrainerData = state =>
  state.dashboard.trainerData ?? defaultObj;
export const getDashboardIdentifierListingData = identifier => state =>
  state.dashboard?.[identifier] ?? defaultArray;

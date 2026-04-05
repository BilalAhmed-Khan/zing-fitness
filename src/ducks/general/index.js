import { makeRequesActions, makeAction } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';

// action creators
export const setUserRole = makeAction('SET_USER_ROLE');
export const cms = makeRequesActions('CMS');
export const getHelp = makeRequesActions('GET_HELP');
export const getStates = makeRequesActions('GET_STATES');
export const getSetting = makeRequesActions('GET_SETTING');

// init state
const initalState = {
  trainer: false,
  cms: {},
  states: [],
  help: {},
  setting: {},
};

// init reducer
export default createReducer(initalState, builder => {
  // simple list
  builder.addCase(setUserRole, (state, action) => {
    state.trainer = action.payload.trainer;
  });
  builder.addCase(cms.success, (state, action) => {
    const { data } = action.payload;
    state.cms = data;
  });
  builder.addCase(getStates.success, (state, action) => {
    const { data } = action.payload;
    state.states = data;
  });
  builder.addCase(getHelp.success, (state, action) => {
    const { data } = action.payload;
    state.help = data;
  });
});

// selectors
export const getUserRole = state => state.general.trainer;
export const getCMSData = state => state.general.cms;
export const getStatesData = state => state.general.states;
export const getHelpData = state => state.general.help;
export const getSettingData = state => state.general.setting;

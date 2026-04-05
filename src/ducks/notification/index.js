import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils';

// action creators
export const getNotification = makeRequesActions('GET_NOTIFCATION');
export const readAllNotification = makeRequesActions('READ_ALL_NOTIFCATION');
export const clearAllNotification = makeRequesActions('CLEAR_ALL_NOTIFCATION');
export const unreadNotificationCount = makeRequesActions(
  'UNREAD_NOTIFCATION_COUNT',
);
// init state
const initalState = { data: [], count: 0 };

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(getNotification.success, (state, action) => {
    const { data } = action.payload;
    console.log(data);
    Util.concatDataArray(state, action);
  });
  builder.addCase(readAllNotification.success, (state, action) => {
    state.count = 0;
  });
  builder.addCase(clearAllNotification.success, (state, action) => {
    state.count = 0;
  });
  builder.addCase(unreadNotificationCount.success, (state, action) => {
    const { data } = action.payload;
    state.count = data.count;
  });
});

const defaultObj = {};
const defaultArray = [];
// // selectors
export const getNotificationData = state =>
  state.notification.data ?? defaultArray;
export const getNotificationCount = state => state.notification.count ?? 0;

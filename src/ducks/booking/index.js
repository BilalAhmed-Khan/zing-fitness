import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils';
import { BOOKING_STATUS } from '../../config/Constants';

// action creators
export const bookSession = makeRequesActions('BOOK_SESSION');
export const bookClass = makeRequesActions('BOOK_CLASS');
export const startBooking = makeRequesActions('START_BOOK_SESSION');
export const endBooking = makeRequesActions('END_BOOK_SESSION');
export const startClass = makeRequesActions('START_BOOK_CLASS');
export const endClass = makeRequesActions('END_BOOK_CLASS');
export const bookingListing = makeRequesActions('BOOKING_LISTING');
export const bookingHistory = makeRequesActions('BOOKING_HISTORY');
export const addParticipants = makeRequesActions('ADD_PARTICIPANTS');
export const updateParticipants = makeRequesActions('UPDATE_PARTICIPANTS');
export const deleteParticipants = makeRequesActions('DELETE_PARTICIPANTS');
export const bookingDetails = makeRequesActions('BOOKING_DETAILS');
export const rateSession = makeRequesActions('RATE_SESSION');
export const findTrainer = makeRequesActions('FIND_TRAINERS');
export const acceptTrainerRequest = makeRequesActions('ACCEPT_TRAINER_REQUEST');
export const rejectTrainerRequest = makeRequesActions('REJECT_TRAINER_REQUEST');
export const trainerAccept = makeAction('TRAINER_ACCEPTED');
export const createRealBookingIntent = makeRequesActions(
  'CREATE_BOOKING_INTENT',
);
export const cancelBooking = makeRequesActions('CANCEL_BOOKING');

// init state
const initalState = { data: {}, bookingDetail: {}, isTrainerAccepted: '' };

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(bookSession.success, (state, action) => {
    const { data } = action.payload;
    // state.data = data;
  });
  builder.addCase(bookClass.success, (state, action) => {
    const { data } = action.payload;
    // state.data = data;
  });
  builder.addCase(bookingListing.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, identifier);
  });
  builder.addCase(bookingHistory.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, identifier);
  });
  builder.addCase(bookingDetails.success, (state, action) => {
    const { data, identifier } = action.payload;
    // Util.concatDataArray(state, action, identifier);
    if (state.bookingDetail?.[identifier]) {
      state.bookingDetail[identifier] = {
        ...state.bookingDetail[identifier],
        ...data,
      };
    } else {
      state.bookingDetail[identifier] = data;
    }
  });
  builder.addCase(startBooking.success, (state, action) => {
    const { data, id } = action.payload;

    // Util.concatDataArray(state, action, id);
    const index = state['BOOKING']?.findIndex(item => item.id === data.id);

    if (index > -1) {
      state['BOOKING'][index] = {
        ...state['BOOKING'][index],
        ...data,
      };
      if (state.bookingDetail?.[id]) {
        state.bookingDetail[id] = {
          ...state.bookingDetail[id],
          ...data,
        };
      }
    }
  });
  builder.addCase(endBooking.success, (state, action) => {
    const { data, id } = action.payload;
    // Util.concatDataArray(state, action, id);
    const index = state['BOOKING']?.findIndex(item => item.id === data?.id);
    if (index > -1) {
      state['BOOKING'][index] = {
        ...state['BOOKING'][index],
        ...data,
      };
      if (state.bookingDetail?.[id]) {
        state.bookingDetail[id] = {
          ...state.bookingDetail[id],
          ...data,
        };
      }
    }
  });
  builder.addCase(acceptTrainerRequest.success, (state, action) => {
    // state.isTrainerAccepted = true;
  });
  builder.addCase(trainerAccept, (state, action) => {
    const { id } = action.payload;
    state.isTrainerAccepted = id;
  });
  builder.addCase(updateParticipants.success, (state, action) => {
    // const { id } = action.payload;
    // state.isTrainerAccepted = id;
  });
  builder.addCase(cancelBooking.success, (state, action) => {
    // const { id } = action.payload;
    // state.isTrainerAccepted = id;
    const { data } = action.payload;
    const id = data?.id;
    const index = state['BOOKING']?.findIndex(item => item.id === data?.id);
    if (index > -1) {
      state['BOOKING'][index] = {
        ...state['BOOKING'][index],
        ...data,
      };
      if (state.bookingDetail?.[id]) {
        state.bookingDetail[id] = {
          ...state.bookingDetail[id],
          ...data,
        };
      }
    }
  });
});

const defaultObj = {};
const defaultArray = [];
// // selectors
export const getbookingData = state => state.booking.data ?? defaultObj;
export const getbookingIdentifierData = identifier => state =>
  state.booking?.[identifier] ?? defaultArray;
export const getbookingIdentifierBookingData = identifier => state =>
  state.booking?.bookingDetail?.[identifier] ?? defaultArray;
export const gettrainerFlag = state => state.booking?.isTrainerAccepted ?? '';

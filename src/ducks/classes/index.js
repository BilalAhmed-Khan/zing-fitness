import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils';

// action creators
export const getClasess = makeRequesActions('GET_CLASESS');
export const createClasess = makeRequesActions('CREATE_CLASESS');
export const updateClasess = makeRequesActions('UPDATE_CLASESS');
export const deleteClases = makeRequesActions('DELETE_CLASES');
// init state
const initalState = { data: {} };

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(createClasess.success, (state, action) => {
    const { data, identifier } = action.payload;
    if (state['CLASESS']) {
      state['CLASESS'].push(data);
    } else {
      state['CLASESS'] = [data];
    }
  });
  builder.addCase(getClasess.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, identifier);
  });
  builder.addCase(updateClasess.success, (state, action) => {
    const { data, id } = action.payload;
    const index = state['CLASESS']?.findIndex(val => val.id === id);
    console.log(index);
    if (state['CLASESS'][index]) {
      state['CLASESS'][index] = {
        ...state['CLASESS'][index],
        ...data,
      };
    }
  });
  builder.addCase(deleteClases.success, (state, action) => {
    const { data, id } = action.payload;
    state['CLASESS'] = state['CLASESS']?.filter(val => val.id !== id);
  });
});

const defaultObj = {};
const defaultArray = [];
// // selectors
export const getClassData = state => state.classes.data ?? defaultObj;
export const getIdentifierClassData = identifier => state =>
  state.classes?.[identifier] ?? defaultArray;

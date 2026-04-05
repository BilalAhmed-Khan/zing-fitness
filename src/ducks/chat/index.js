import { makeAction, makeRequesActions } from '../ActionTypes';
import { createReducer } from '@reduxjs/toolkit';
import { Util } from '../../utils';
import { authUserLogout } from '../auth';

// action creators
export const getRooms = makeRequesActions('GET_ROOMS');
export const createChatRoom = makeRequesActions('CREATE_CHAT_ROOM');
export const deleteChat = makeRequesActions('DELETE_CHAT');
export const message = makeRequesActions('MESSAGE');
export const deleteMessage = makeRequesActions('DELETE_MESSAGE');
export const connectAction = makeAction('CONNECT_SOCKET');
export const currentRoom = makeAction('CURRENT_ROOM');
export const unreadCount = makeAction('UN_READ_COUNT');

// init state
const initalState = {
  data: {},
  AllChats: [],
  currentRoomId: '',
  chatUnreadCount: 0,
};

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(getRooms.success, (state, action) => {
    const { data } = action.payload;
    Util.concatDataArray(state, action, 'AllChats');
  });
  builder.addCase(createChatRoom.success, (state, action) => {
    const { data, identifier } = action.payload;
    Util.concatDataArray(state, action, 'data', identifier);
  });
  builder.addCase(message.success, (state, action) => {
    const { data } = action.payload;
    // console.log('data ==>', data);
    const { roomId } = data;
    state.data[roomId].unshift(data);
  });
  builder.addCase(deleteMessage.success, (state, action) => {
    const { data } = action.payload;
    console.log('deleteMessage ==>', data);
    const { roomId, id } = data;
    state.data[roomId] = state.data[roomId].filter(val => val.id !== id);
  });
  builder.addCase(deleteChat.request, (state, action) => {
    const { roomId } = action.payload;
    console.log('roomId ==>', roomId);
    state.AllChats = state.AllChats.filter(val => val.roomId !== roomId);
  });
  builder.addCase(currentRoom, (state, action) => {
    const { data } = action.payload;
    state.currentRoomId = data;
    const index = state.AllChats.findIndex(val => val.roomId !== data);
    if (index >= 0) {
      state.AllChats[index] = {
        ...state.AllChats[index],
        unreadCount: 0,
      };
    }
  });
  builder.addCase(unreadCount, (state, action) => {
    const { data } = action.payload;
    state.chatUnreadCount = data;
  });
  builder.addCase(authUserLogout.success, (state, action) => {
    const { data } = action.payload;
    state.data = {};
    state.AllChats = [];
    state.currentRoomId = '';
    state.chatUnreadCount = 0;
  });
});

const defaultObj = {};
const defaultArray = [];
// // selectors
export const getChatData = state => state.chat.AllChats ?? defaultArray;
export const getChatCurrentRoomId = state => state.chat.currentRoomId ?? '';
export const getChatUnreadCount = state => state.chat.chatUnreadCount ?? 0;
export const getChatMessagesData = identifier => state =>
  state.chat.data?.[identifier] ?? defaultArray;

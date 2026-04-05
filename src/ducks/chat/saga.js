import { eventChannel } from 'redux-saga';
import {
  fork,
  take,
  call,
  put,
  cancel,
  select,
  cancelled,
} from 'redux-saga/effects';
import {
  connectAction,
  createChatRoom,
  deleteChat,
  deleteMessage,
  getRooms,
  message,
  successCreatePrivateGame,
  unreadCount,
} from './index';

import {
  DataHandler,
  NavigationService,
  SocketUtil as connect,
} from '../../utils';
import { getRequestFlag } from '../requestFlags';

function subscribe(socket) {
  return eventChannel(emit => {
    console.log('getRooms =>');
    socket.on('chatRooms', resp => {
      console.log('chatRooms =>');
      const { reset, cb } = getRequestFlag('GET_ROOMS')(
        DataHandler.getStore().getState(),
      );
      console.log('getRooms =>', { data: resp });
      emit(
        getRooms.success({
          data: resp?.rooms?.data,
          page: resp?.rooms?.pagination,
          reset,
        }),
      );
      cb?.(resp);
    });

    socket.on('loadMessages', resp => {
      console.log('loadMessages =>');
      const { reset, cb } = getRequestFlag(`CREATE_CHAT_ROOM_${resp.roomId}`)(
        DataHandler.getStore().getState(),
      );
      emit(
        createChatRoom.success({
          data: resp?.messages?.data,
          page: resp?.messages?.pagination,
          reset,
          identifier: resp?.roomId,
        }),
      );
      cb?.(resp);
      // NavigationService.navigate('Chat', { id: identifier });
      console.log('getRooms =>', { data: resp });
    });
    socket.on('chatRoomId', resp => {
      console.log('chatRoomId =>', { data: resp });
      const { reset, cb } = getRequestFlag(`CREATE_CHAT_ROOM_${resp.userId}`)(
        DataHandler.getStore().getState(),
      );
      cb?.(resp);
      // emit(unreadCount({ data: resp?.unreadCount?.unreadCount }));
    });

    socket.on('unreadChatCount', resp => {
      console.log('unreadChatCount =>', { data: resp });
      emit(unreadCount({ data: resp?.unreadCount?.unreadCount }));
    });
    socket.on('message', resp => {
      console.log('message =>', { data: resp });
      emit(message.success({ data: resp }));
    });
    socket.on('messageDeleted', resp => {
      console.log('messageDeleted =>', { data: resp });
      emit(deleteMessage.success({ data: resp }));
    });
    return () => {
      socket.off();
    };
  });
}

function* read(socket) {
  const chan = yield call(subscribe, socket);
  /* eslint-disable  no-constant-condition */
  try {
    while (true) {
      const action = yield take(chan);
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}

function* createChat(socket) {
  console.log('CREATE_CHAT_ROOM   ====>');
  while (true) {
    console.log('while');
    const { payload } = yield take(createChatRoom.request);
    const { payloadApi } = payload;
    console.log('createChatRoom', payloadApi);
    if (payloadApi?.page > 1) {
      socket.emit('fetchMessages', payloadApi);
    } else {
      socket.emit('startChat', payloadApi);
    }
  }
}

function* getChatRoom(socket) {
  console.log('FETCH_ROOM   ====>');
  while (true) {
    console.log('while');
    const { payload } = yield take(getRooms.request);
    const { payloadApi } = payload;

    console.log('fetch room', payloadApi);
    socket.emit('fetchRooms', payloadApi);
  }
}

function* deleteWholeChat(socket) {
  console.log('SEND MESSAGE   ====>');
  while (true) {
    console.log('while');
    const { payload } = yield take(deleteChat.request);
    console.log('fetch room', payload);
    socket.emit('deleteChatRoom', payload);
  }
}

function* sendMessages(socket) {
  console.log('SEND MESSAGE   ====>');
  while (true) {
    console.log('while');
    const { payload } = yield take(message.request);
    console.log('fetch room', payload);
    socket.emit('sendMessage', payload);
  }
}

function* deleteMessages(socket) {
  console.log('SEND MESSAGE   ====>');
  while (true) {
    console.log('while');
    const { payload } = yield take(deleteMessage.request);
    console.log('fetch room', payload);
    socket.emit('deleteMessage', payload);
  }
}

function* handleReadIO(socket) {
  // while (true) {
  console.log('handleReadIO ==>', socket);
  yield fork(read, socket);
  // yield take(SOCKET_CONNECT);
  // }
}

function* handleIO(socket) {
  console.log('handleIO', socket);
  yield fork(handleReadIO, socket);
  yield fork(createChat, socket);
  yield fork(getChatRoom, socket);
  yield fork(sendMessages, socket);
  yield fork(deleteWholeChat, socket);
  yield fork(deleteMessages, socket);
}

function* flow() {
  while (true) {
    try {
      yield take(connectAction);
      const socket = yield call(connect);
      console.log('socket ==>', socket);
      const task = yield fork(handleIO, socket);

      // yield take('abcd');
      // yield cancel(task);
    } catch (error) {
      console.log(error);
    }
  }
}

export default function* root() {
  yield fork(flow);
}

import { fork } from 'redux-saga/effects';
// import testPost from './testPost/saga';
import auth from './auth/saga';
import classes from './classes/saga';
import dashboard from './dashboard/saga';
import general from './general/saga';
import trainer from './trainer/saga';
import booking from './booking/saga';
import notification from './notification/saga';
import chat from './chat/saga';

export default function* root() {
  yield fork(general);
  yield fork(auth);
  yield fork(classes);
  yield fork(dashboard);
  yield fork(trainer);
  yield fork(booking);
  yield fork(notification);
  yield fork(chat);
}

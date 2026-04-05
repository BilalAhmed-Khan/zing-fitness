import { combineReducers } from 'redux';

import requestFlags from './requestFlags';
import network from './network';
import general from './general';
import auth from './auth';
import classes from './classes';
import dashboard from './dashboard';
import trainer from './trainer';
import booking from './booking';
import notification from './notification';
import chat from './chat';

const appReducer = combineReducers({
  requestFlags,
  network,
  general,
  auth,
  classes,
  dashboard,
  trainer,
  booking,
  notification,
  chat,
});

export default appReducer;

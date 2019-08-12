import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import patient from './patient';

export default combineReducers({ alert, auth, patient });
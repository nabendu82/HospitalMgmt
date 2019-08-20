import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import patient from './patient';
import hospital from './hospital';

export default combineReducers({ alert, auth, patient, hospital });
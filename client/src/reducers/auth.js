import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FORGOT_SUCCESS,
    FORGOT_FAIL,
    GET_ALL_USERS,
    USER_ERROR,
    GET_USER,
    EDIT_USER,
    LOGOUT
  } from '../actions/types';

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    calleduser: null,
    allusers:[]
  };

  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case GET_ALL_USERS:
        return {
            ...state,
            allusers: payload,
            loading: false
        };
      case GET_USER:
        return {
            ...state,
            calleduser: payload,
            loading: false
        };
      case EDIT_USER:
            return {
                ...state,
                allusers: [payload, ...state.allusers],
                loading: false
            };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      case FORGOT_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case FORGOT_FAIL:
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false
        };
      case USER_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        };
      default:
        return state;
    }
  }

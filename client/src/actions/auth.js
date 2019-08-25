import axios from 'axios';
import { setAlert } from './alert';
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
  GET_USER,
  EDIT_USER,
  USER_ERROR,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

// Register User
export const register = ({ name, email, password, avatar }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ name, email, password, avatar });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL
      });
    }
  };

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/api/auth', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: LOGIN_FAIL
      });
    }
  };

// Forgot Password
export const forgot = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  console.log(body);

  try {
    const res = await axios.put('/api/users', body, config);

    dispatch({
      type: FORGOT_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: FORGOT_FAIL
    });
  }
};

 //Get All Users
 export const getUsers = () => async dispatch => {
  try {
      const res = await axios.get('/api/users');

      dispatch({
          type: GET_ALL_USERS,
          payload: res.data
      });

  } catch (err) {
      dispatch({
          type: USER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
  }
}

  // Get called user
  export const getUser = id => async dispatch => {
    try {
      const res = await axios.get(`/api/users/${id}`);

      dispatch({
        type: GET_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Edit user
export const editUser = (id, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/users/${id}`, formData, config);

    dispatch({
      type: EDIT_USER,
      payload: res.data
    });

    dispatch(setAlert('User Updated', 'success'));
    history.push('/home');

  } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
          type: USER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
};

  // Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
  };
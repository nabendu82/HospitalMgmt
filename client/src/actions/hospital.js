import axios from 'axios';
import { setAlert } from './alert';
import { GET_ALL_HOSPITALS, ADD_HOSPITAL, EDIT_HOSPITAL, GET_HOSPITAL, DELETE_HOSPITAL, HOSPITAL_ERROR } from './types';

//Get All Hospitals
export const getHospitals = () => async dispatch => {
    try {
        const res = await axios.get('/api/hospitals');

        dispatch({
            type: GET_ALL_HOSPITALS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: HOSPITAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add hospital
export const addHospital = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/hospitals', formData, config);

        dispatch({
            type: ADD_HOSPITAL,
            payload: res.data
        });

        dispatch(setAlert('Hospital Created', 'success'));
        history.push('/home');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: HOSPITAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Edit hospital
export const editHospital = (id, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.put(`/api/hospitals/${id}`, formData, config);

        dispatch({
            type: EDIT_HOSPITAL,
            payload: res.data
        });

        dispatch(setAlert('Hospital Updated', 'success'));
        history.push('/home');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: HOSPITAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get hospital
export const getHospital = id => async dispatch => {
    try {
        const res = await axios.get(`/api/hospitals/${id}`);

        dispatch({
            type: GET_HOSPITAL,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: HOSPITAL_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete hospital
 export const deleteHospital = id => async dispatch => {
    try {
      await axios.delete(`/api/hospitals/${id}`);

      dispatch({
        type: DELETE_HOSPITAL,
        payload: id
      });

      dispatch(setAlert('Hospital Removed', 'success'));
    } catch (err) {
      dispatch({
        type: HOSPITAL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
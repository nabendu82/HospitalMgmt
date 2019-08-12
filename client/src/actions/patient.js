import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PATIENTS,
    GET_ALL_PATIENTS,
    GET_PATIENT,
    PATIENT_ERROR,
    DELETE_PATIENT,
    ADD_PATIENT,
    EDIT_PATIENT
 } from './types';

 //Get Me Patients
 export const getMePatients = () => async dispatch => {
    try {
        const res = await axios.get('/api/patients/me');

        dispatch({
            type: GET_PATIENTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
 }

 //Get All Patients
 export const getPatients = () => async dispatch => {
    try {
        const res = await axios.get('/api/patients');

        dispatch({
            type: GET_ALL_PATIENTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
 }

 // Delete patient
export const deletePatient = id => async dispatch => {
    try {
      await axios.delete(`/api/patients/${id}`);

      dispatch({
        type: DELETE_PATIENT,
        payload: id
      });

      dispatch(setAlert('Patient Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Add patient
export const addPatient = (formData, history) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/patients', formData, config);

      dispatch({
        type: ADD_PATIENT,
        payload: res.data
      });

      dispatch(setAlert('Patient Created', 'success'));
      history.push('/home');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
  };

    // Edit patient
export const editPatient = (id, formData, history) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/patients/${id}`, formData, config);

      dispatch({
        type: EDIT_PATIENT,
        payload: res.data
      });

      dispatch(setAlert('Patient Updated', 'success'));
      history.push('/home');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PATIENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
  };

  // Get patient
export const getPatient = id => async dispatch => {
    try {
      const res = await axios.get(`/api/patients/${id}`);

      dispatch({
        type: GET_PATIENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

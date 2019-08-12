import {
    GET_PATIENTS,
    GET_ALL_PATIENTS,
    GET_PATIENT,
    PATIENT_ERROR,
    DELETE_PATIENT,
    ADD_PATIENT,
    EDIT_PATIENT
} from '../actions/types';

const initialState = {
    patients: [],
    allpatients: [],
    patient: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PATIENTS:
            return {
                ...state,
                patients: payload,
                loading: false
            };
        case GET_ALL_PATIENTS:
            return {
                ...state,
                allpatients: payload,
                loading: false
            };
        case GET_PATIENT:
            return {
                ...state,
                patient: payload,
                loading: false
            };
        case ADD_PATIENT:
            return {
                ...state,
                patients: [payload, ...state.patients],
                allpatients: [payload, ...state.allpatients],
                loading: false
            };
        case EDIT_PATIENT:
            return {
                ...state,
                patients: [payload, ...state.patients],
                allpatients: [payload, ...state.allpatients],
                loading: false
            };
        case DELETE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter(post => post._id !== payload),
                allpatients: state.allpatients.filter(post => post._id !== payload),
                loading: false
            };
        case PATIENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }

}
import { GET_ALL_HOSPITALS, ADD_HOSPITAL,EDIT_HOSPITAL, GET_HOSPITAL, DELETE_HOSPITAL, HOSPITAL_ERROR } from '../actions/types';

const initialState = {
    allhospitals: [],
    hospital: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_HOSPITALS:
        return {
            ...state,
            allhospitals: payload,
            loading: false
        };
        case GET_HOSPITAL:
        return {
            ...state,
            hospital: payload,
            loading: false
        };
        case HOSPITAL_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        };
        case ADD_HOSPITAL:
            return {
                ...state,
                allhospitals: [payload, ...state.allhospitals],
                loading: false
            };
        case EDIT_HOSPITAL:
            return {
                ...state,
                allhospitals: [payload, ...state.allhospitals],
                loading: false
            };
        case DELETE_HOSPITAL:
            return {
                ...state,
                allhospitals: state.allhospitals.filter(host => host._id !== payload),
                loading: false
            };
        default:
            return state;

    }

}
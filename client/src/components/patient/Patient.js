import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPatient } from "../../actions/patient";
import Moment from 'react-moment';

const Patient = ({ getPatient, patient: { patient, loading }, match }) => {

    useEffect(() => {
        getPatient(match.params.id);
    }, [getPatient]);

    return loading || patient === null ? (
        <Spinner />
    ) : (

            <>
                <Link to='/patients/me' className='btn'>
                    Back To Patients
                </Link>
                <div className='form'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={patient.name}
                        readOnly
                    />
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                        type='text'
                        id='mobile'
                        name='mobile'
                        value={patient.mobile}
                        readOnly
                    />
                    <label htmlFor='age'>Age</label>
                    <input
                        type='text'
                        id='age'
                        name='age'
                        value={patient.age}
                        readOnly
                    />
                    <label htmlFor='gender'>Gender</label>
                    <input
                        type='text'
                        id='gender'
                        name='gender'
                        value={patient.gender}
                        readOnly
                    />
                    <label htmlFor='speciality'>Speciality</label>
                    <input
                        type='text'
                        id='speciality'
                        name='speciality'
                        value={patient.speciality}
                        readOnly
                    />
                    <label htmlFor='hospital'>Hospital</label>
                    <input
                        type='text'
                        id='hospital'
                        name='hospital'
                        value={patient.hospital}
                        readOnly
                    />
                    <label htmlFor='doctor'>Doctor</label>
                    <input
                        type='text'
                        id='doctor'
                        name='doctor'
                        value={patient.doctor}
                        readOnly
                    />
                    <label htmlFor='nationality'>Nationality</label>
                    <input
                        type='text'
                        id='nationality'
                        name='nationality'
                        value={patient.nationality}
                        readOnly
                    />
                    <label htmlFor='date'>Appointment</label>
                    <div className="datearea">
                        <Moment format='LLL'>{patient.date}</Moment>
                    </div>
                </div>
            </>
        );
}

Patient.propTypes = {
    getPatient: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    patient: state.patient
});

export default connect(mapStateToProps, { getPatient })(Patient);


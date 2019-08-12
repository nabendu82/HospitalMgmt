import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Patient from './Patient';
import { getMePatients } from '../../actions/patient';

const Patients = ({ getMePatients, patient: { patients, loading } }) => {
    useEffect(() => {
        getMePatients();
    }, [getMePatients]);
    console.log(patients);
    return loading ? <Spinner /> : (
        <>
            <h1 className='large text-primary'>Patients</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Patients referred by Me
            </p>
            <div className='patients'>
                {patients && patients.map(pat => (
                    <Patient key={pat._id} patient={pat} />
                ))}
            </div>
        </>
    )
}

Patients.propTypes = {
    getMePatients: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    patient: state.patient
});

export default connect(mapStateToProps, { getMePatients })(Patients);

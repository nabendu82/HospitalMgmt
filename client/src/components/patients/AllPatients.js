import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PatientItem from './PatientItem';
import { getPatients } from '../../actions/patient';

const AllPatients = ({ getPatients, patient: { allpatients, loading } }) => {
    useEffect(() => {
        getPatients();
    }, [getPatients]);
    console.log(allpatients);
    return loading ? <Spinner /> : (
        <>
            <h1 className='large text-primary'>All Patients</h1>
            <p className='lead'>
                <i className='fas fa-user' /> All Patients records
            </p>
            <div className='patients'>
                {allpatients && allpatients.map(pat => (
                    <PatientItem key={pat._id} patient={pat} />
                ))}
            </div>
        </>
    )
}

AllPatients.propTypes = {
    getPatients: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    patient: state.patient
});

export default connect(mapStateToProps, { getPatients })(AllPatients);

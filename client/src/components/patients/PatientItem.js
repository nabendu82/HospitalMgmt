import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePatient } from '../../actions/patient';
import './patient.css';

const PatientItem = ({ auth, deletePatient, patient }) => {
    return (
        <div className='bg-white p-1 my-1'>
            <h1 className='lead text-dark'>{patient.name}</h1>
            <div className="patient__grid">
                <div className="normal-text">{patient.gender}</div>
                <div className="normal-text">{patient.doctor}</div>
                <div className="normal-text">{patient.nationality}</div>
                <div className="normal-text">{patient.mobile}</div>
                <div className="normal-text">{patient.age}</div>
                <div className="normal-text">
                    <Moment format='LLL'>{patient.date}</Moment>
                </div>
            </div>
            <Link to={`/patients/${patient._id}`} className='btn btn-primary'>Details</Link>
            {!auth.loading && (
            <>
                <Link to={`/edit-patient/${patient._id}`} className='btn btn-primary'>Edit</Link>
                <button
                onClick={() => deletePatient(patient._id)}
                type='button' className='btn btn-danger'>
                <i className='fas fa-times' />
                </button>
            </>
          )}

        </div>
    )
}

PatientItem.propTypes = {
    patient: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePatient: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, {deletePatient})(PatientItem);

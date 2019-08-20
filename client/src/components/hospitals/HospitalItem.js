import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteHospital } from '../../actions/hospital';
import '../patients/patient.css';

const HospitalItem = ({ hospital, deleteHospital }) => {
    return (
        <div className='bg-white p-1 my-1'>
            <h1 className='lead text-dark'>{hospital.name}</h1>
            <div className="patient__grid">
                <div className="normal-text">{hospital.area}</div>
                <div className="normal-text">{hospital.city}</div>
                <div className="normal-text">{hospital.country}</div>
                <div className="normal-text">{hospital.mobile}</div>
                <div className="normal-text">{hospital.email}</div>
            </div>
            <Link to={`/hospitals/${hospital._id}`} className='btn btn-primary'>Details</Link>
            <Link to={`/edit-hospital/${hospital._id}`} className='btn btn-primary'>Edit</Link>
            <button
                onClick={() => deleteHospital(hospital._id)}
                type='button' className='btn btn-danger'>
                <i className='fas fa-times' />
            </button>

        </div>
    )
}

HospitalItem.propTypes = {
    hospital: PropTypes.object.isRequired,
    deleteHospital: PropTypes.func.isRequired
}

export default connect(null, {deleteHospital})(HospitalItem);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
//import { deletePatient } from '../../actions/patient';
import '../patients/patient.css';

const UserItem = ({ auth, user }) => {
    return (
        <div className='bg-white p-1 my-1'>
            <h1 className='lead text-dark'>{user.name}</h1>
            <div className="patient__grid">
                <div className="normal-text">{user.email}</div>
                <div className="normal-text">{user.avatar}</div>
                <div className="normal-text">
                    <Moment format='LLL'>{user.date}</Moment>
                </div>
            </div>
            <Link to={`/patients/${user._id}`} className='btn btn-primary'>Details</Link>
            {/* {!auth.loading && (
            <>
                <Link to={`/edit-patient/${user._id}`} className='btn btn-primary'>Edit</Link>
                <button
                onClick={() => deletePatient(user._id)}
                type='button' className='btn btn-danger'>
                <i className='fas fa-times' />
                </button>
            </>
          )} */}

        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    //deletePatient: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
  });

//export default connect(mapStateToProps, {deletePatient})(PatientItem);
export default connect(mapStateToProps, {})(UserItem);

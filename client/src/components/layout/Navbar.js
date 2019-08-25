import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        <ul>
          <li>
              <Link to='/home'>Home</Link>
          </li>
          <li>
              <Link to='/patients/me'>My Patients</Link>
          </li>
          <li>
              <Link to='/add-patient'>Add Patient</Link>
          </li>

            {user && user.role === "Admin" && (
                <li>
                    <Link to='/add-hospital'>Add Hospital</Link>
                </li>
            )}
            {user && (user.role === "Admin" || user.role === "Ops") && (
             <>
                <li>
                    <Link to='/hospitals'>Hospitals</Link>
                </li>
                <li>
                    <Link to='/users'>Users</Link>
                </li>
             </>
          )}
          <li>
            <a onClick={logout} href='#!'>
              <i className='fas fa-sign-out-alt' />{' '}
              <span className='hide-sm'>Logout</span>
            </a>
          </li>
        </ul>
      );

      const guestLinks = (
        <ul>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-stethoscope"></i> OrangeHealth</Link>
            </h1>
            {!loading && (
                <>{isAuthenticated ? authLinks : guestLinks}</>
            )}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);

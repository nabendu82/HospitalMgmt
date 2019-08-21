import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { forgot } from '../../actions/auth';
import PropTypes from 'prop-types';

const Forgot = ({ setAlert, forgot, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const { email, password, password2 } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            forgot(email, password);
        }
      };

    if (isAuthenticated) {
        return <Redirect to='/home' />;
    }

    return (
        <>
            <h1 className="large text-primary">Forgot Password</h1>
            <p className="lead"><i className="fas fa-user"></i> Reset your password</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Reset" />
            </form>
        </>
    )
}

Forgot.propTypes = {
    setAlert: PropTypes.func.isRequired,
    forgot: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(
    mapStateToProps,
    { setAlert, forgot }
  )(Forgot);

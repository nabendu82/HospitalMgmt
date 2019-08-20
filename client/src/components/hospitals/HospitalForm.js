import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addHospital } from "../../actions/hospital";

const HospitalForm = ({ addHospital, history }) => {
    const [formData, setFormData] = useState({
        name: "",
        area: "",
        city: "",
        country: "",
        mobile: "",
        email: ""
    });

    const {
        name,
        area,
        city,
        country,
        mobile,
        email
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addHospital(formData, history);
    };


    return (
        <>
            <h1 className='large text-primary'>Add a Hospital</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Let's get some information about the hospital
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Name'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='number'
                        placeholder='* Mobile'
                        name='mobile'
                        value={mobile}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Area'
                        name='area'
                        value={area}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* City'
                        name='city'
                        value={city}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Country'
                        name='country'
                        value={country}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/hospitals'>
                    Go Back
                </Link>
            </form>

        </>
    )
}

HospitalForm.propTypes = {
    addHospital: PropTypes.func.isRequired
}

export default connect(null, {addHospital})(withRouter(HospitalForm));

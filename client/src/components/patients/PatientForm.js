import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPatient } from "../../actions/patient";
import { getHospitals } from '../../actions/hospital';
import UploadDoc from '../upload/UploadDoc';

const PatientForm = ({ getHospitals, hospital: { allhospitals }, addPatient, history }) => {
    useEffect(() => {
        getHospitals();
    }, [getHospitals]);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        age: "",
        gender: "",
        speciality: "",
        hospital: "",
        doctor: "",
        nationality: "",
        date: ""
    });

    const {
        name,
        mobile,
        age,
        gender,
        speciality,
        hospital,
        doctor,
        nationality,
        date
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addPatient(formData, history);
    };

    console.log(allhospitals);

    return (
        <>
            <h1 className='large text-primary'>Add a Patient</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Let's get some information about the patient
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
                        placeholder='* Age'
                        name='age'
                        value={age}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <select name='gender' value={gender} onChange={e => onChange(e)}>
                        <option value='0'>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Others'>Others</option>
                    </select>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Speciality'
                        name='speciality'
                        value={speciality}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <select name='hospital' value={hospital} onChange={e => onChange(e)}>
                        <option value='0'>Select Hospital</option>
                        {allhospitals &&
                            allhospitals.map(hospital => <option key={hospital._id}
                            value={hospital.name}>{hospital.name}</option>)
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Doctor'
                        name='doctor'
                        value={doctor}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Nationality'
                        name='nationality'
                        value={nationality}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='datetime-local'
                        placeholder='Appointment'
                        name='date'
                        value={date}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <UploadDoc />
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/patients/me'>
                    Go Back
                </Link>
            </form>

        </>
    )
}

PatientForm.propTypes = {
    addPatient: PropTypes.func.isRequired,
    getHospitals: PropTypes.func.isRequired,
    hospital: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    hospital: state.hospital
});

export default connect(mapStateToProps, { addPatient, getHospitals })(withRouter(PatientForm));

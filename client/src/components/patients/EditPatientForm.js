import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editPatient, getPatient } from "../../actions/patient";
import isEmpty from './is-empty';
import UploadDoc from '../upload/UploadDoc';

class EditPatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mobile: "",
            age: "",
            gender: "",
            speciality: "",
            hospital: "",
            doctor: "",
            nationality: "",
            date: "",
            patientstatus: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getPatient(this.props.match.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.patient.patient) {
            const patient = nextProps.patient.patient;

          // If patient field doesnt exist, make empty string
            patient.name = !isEmpty(patient.name) ? patient.name : '';
            patient.mobile = !isEmpty(patient.mobile) ? patient.mobile : '';
            patient.age = !isEmpty(patient.age) ? patient.age : '';
            patient.gender = !isEmpty(patient.gender) ? patient.gender : '';
            patient.speciality = !isEmpty(patient.speciality) ? patient.speciality : '';
            patient.hospital = !isEmpty(patient.hospital) ? patient.hospital : '';
            patient.doctor = !isEmpty(patient.doctor) ? patient.doctor : '';
            patient.nationality = !isEmpty(patient.nationality) ? patient.nationality : '';
            patient.date = !isEmpty(patient.date) ? patient.date : '';
            patient.patientstatus = !isEmpty(patient.patientstatus) ? patient.patientstatus : '';
            // Set component fields state
            this.setState({
                name: patient.name,
                mobile: patient.mobile,
                age: patient.age,
                gender: patient.gender,
                speciality: patient.speciality,
                hospital: patient.hospital,
                doctor: patient.doctor,
                nationality: patient.nationality,
                date: patient.date.substring(0, 16),
                patientstatus: patient.patientstatus
            });
        }
      }


    onSubmit(e) {
        e.preventDefault();

        const patientData = {
          name: this.state.name,
          mobile: this.state.mobile,
          age: this.state.age,
          gender: this.state.gender,
          speciality: this.state.speciality,
          hospital: this.state.hospital,
          doctor: this.state.doctor,
          nationality: this.state.nationality,
          date: this.state.date,
          patientstatus: this.state.patientstatus
        };

        this.props.editPatient(this.props.match.params.id, patientData, this.props.history);

      }

      onChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    render() {
        const auth = this.props.auth;
    return (
        <>
            <h1 className='large text-primary'>Edit a Patient</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Let's edit some information about the patient
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Name'
                        name='name'
                        value={this.state.name}
                        onChange={this.onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='number'
                        placeholder='* Mobile'
                        name='mobile'
                        value={this.state.mobile}
                        onChange={this.onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Age'
                        name='age'
                        value={this.state.age}
                        onChange={this.onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <select name='gender' value={this.state.gender} onChange={this.onChange}>
                        <option value='0'>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Others'>Others</option>
                    </select>
                </div>
                {auth.user && auth.user.role === "Admin" && (
                    <div className='form-group'>
                        <select name='patientstatus' value={this.state.patientstatus} onChange={this.onChange}>
                            <option value='0'>Select Patient Status</option>
                            <option value='Submitted'>Submitted</option>
                            <option value='RefHospital'>Ref to Hospital</option>
                            <option value='HospAccepted'>Hospital Accepted</option>
                            <option value='HospRejected'>Hospital Rejected</option>
                            <option value='OPUnderTreat'>OP Under Treatment</option>
                            <option value='OPTreatDone'>OP Treatment Done</option>
                            <option value='IPUnderTreat'>IP Under Treatment</option>
                            <option value='IPTreatDone'>IP Treatment Done</option>
                            <option value='Discharged'>Discharged</option>
                            <option value='PtInProgess'>Points In Progess</option>
                            <option value='ClaimNow'>Claim Now</option>
                            <option value='PointsRedeemed'>Points Redeemed</option>
                        </select>
                    </div>
                )}

                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Speciality'
                        name='speciality'
                        value={this.state.speciality}
                        onChange={this.onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Hospital'
                        name='hospital'
                        value={this.state.hospital}
                        onChange={this.onChange}
                        readOnly
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Doctor'
                        name='doctor'
                        value={this.state.doctor}
                        onChange={this.onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Nationality'
                        name='nationality'
                        value={this.state.nationality}
                        onChange={this.onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='datetime-local'
                        placeholder='Appointment'
                        name='date'
                        value={this.state.date}
                        onChange={this.onChange}
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
}

EditPatientForm.propTypes = {
    editPatient: PropTypes.func.isRequired,
    getPatient: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    patient: state.patient,
    auth: state.auth
});

export default connect(mapStateToProps, { editPatient, getPatient })(withRouter(EditPatientForm));

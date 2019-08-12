import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editPatient, getPatient } from "../../actions/patient";
import isEmpty from './is-empty';

class EditPatientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mobile: "",
            age: "",
            gender: "",
            speciality: "",
            doctor: "",
            nationality: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getPatient(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.patient.patient) {
            const patient = nextProps.patient.patient;

          // If patient field doesnt exist, make empty string
            patient.name = !isEmpty(patient.name) ? patient.name : '';
            patient.mobile = !isEmpty(patient.mobile) ? patient.mobile : '';
            patient.age = !isEmpty(patient.age) ? patient.age : '';
            patient.gender = !isEmpty(patient.gender) ? patient.gender : '';
            patient.speciality = !isEmpty(patient.speciality) ? patient.speciality : '';
            patient.doctor = !isEmpty(patient.doctor) ? patient.doctor : '';
            patient.nationality = !isEmpty(patient.nationality) ? patient.nationality : '';
            // Set component fields state
            this.setState({
                name: patient.name,
                mobile: patient.mobile,
                age: patient.age,
                gender: patient.gender,
                speciality: patient.speciality,
                doctor: patient.doctor,
                nationality: patient.nationality,
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
          doctor: this.state.doctor,
          nationality: this.state.nationality
        };

        this.props.editPatient(this.props.match.params.id, patientData, this.props.history);

      }

      onChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    render() {
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
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/patients'>
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
    patient: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    patient: state.patient
});

export default connect(mapStateToProps, { editPatient, getPatient })(withRouter(EditPatientForm));

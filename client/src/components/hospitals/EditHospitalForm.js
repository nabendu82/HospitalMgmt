import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editHospital, getHospital } from "../../actions/hospital";
import isEmpty from '../patients/is-empty';

class EditHospitalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            area: "",
            city: "",
            country: "",
            mobile: "",
            email: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getHospital(this.props.match.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.hospital.hospital) {
            const hospital = nextProps.hospital.hospital;

          // If hospital field doesnt exist, make empty string
            hospital.name = !isEmpty(hospital.name) ? hospital.name : '';
            hospital.area = !isEmpty(hospital.area) ? hospital.area : '';
            hospital.city = !isEmpty(hospital.city) ? hospital.city : '';
            hospital.country = !isEmpty(hospital.country) ? hospital.country : '';
            hospital.mobile = !isEmpty(hospital.mobile) ? hospital.mobile : '';
            hospital.email = !isEmpty(hospital.email) ? hospital.email : '';
            // Set component fields state
            this.setState({
                name: hospital.name,
                area: hospital.area,
                city: hospital.city,
                country: hospital.country,
                mobile: hospital.mobile,
                email: hospital.email
            });
        }
      }


    onSubmit(e) {
        e.preventDefault();

        const hospitalData = {
          name: this.state.name,
          area: this.state.area,
          city: this.state.city,
          country: this.state.country,
          mobile: this.state.mobile,
          email: this.state.email
        };

        this.props.editHospital(this.props.match.params.id, hospitalData, this.props.history);

      }

      onChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    render() {
    return (
        <>
            <h1 className='large text-primary'>Edit a Hospital</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Let's edit some information about the hospital
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
                        placeholder='Area'
                        name='area'
                        value={this.state.area}
                        onChange={this.onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* City'
                        name='city'
                        value={this.state.city}
                        onChange={this.onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Country'
                        name='country'
                        value={this.state.country}
                        onChange={this.onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={this.state.email}
                        onChange={this.onChange}
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
}

EditHospitalForm.propTypes = {
    editHospital: PropTypes.func.isRequired,
    getHospital: PropTypes.func.isRequired,
    hospital: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    hospital: state.hospital
});

export default connect(mapStateToProps, { editHospital, getHospital })(withRouter(EditHospitalForm));

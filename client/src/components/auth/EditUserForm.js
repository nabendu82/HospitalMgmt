import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser, getUser } from "../../actions/auth";
import isEmpty from '../patients/is-empty';

class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.auth.calleduser) {
            const curruser = nextProps.auth.calleduser;

          // If curruser field doesnt exist, make empty string
            curruser.name = !isEmpty(curruser.name) ? curruser.name : '';
            curruser.email = !isEmpty(curruser.email) ? curruser.email : '';
            curruser.role = !isEmpty(curruser.role) ? curruser.role : '';

            // Set component fields state
            this.setState({
                name: curruser.name,
                email: curruser.email,
                role: curruser.role,
            });
        }
      }


    onSubmit(e) {
        e.preventDefault();

        const userData = {
          name: this.state.name,
          email: this.state.email,
          role: this.state.role,
        };

        this.props.editUser(this.props.match.params.id, userData, this.props.history);

      }

      onChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    render() {
    return (
        <>
            <h1 className='large text-primary'>Edit an User</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Let's edit some information about the user
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
                        type='email'
                        placeholder='* Email'
                        name='email'
                        value={this.state.email}
                        onChange={this.onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <select name='role' value={this.state.role} onChange={this.onChange}>
                        <option value='0'>Select Role</option>
                        <option value='Admin'>Admin</option>
                        <option value='Ops'>Ops</option>
                        <option value='Normal'>Normal</option>
                    </select>
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

EditUserForm.propTypes = {
    editUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { editUser, getUser })(withRouter(EditUserForm));

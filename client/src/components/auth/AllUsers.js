import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { getUsers } from '../../actions/auth';

const AllUsers = ({ getUsers, auth: { allusers, loading } }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    console.log(allusers);
    return loading ? <Spinner /> : (
        <>
            <h1 className='large text-primary'>All Users</h1>
            <p className='lead'>
                <i className='fas fa-user' /> All Users records
            </p>
            <div className='patients'>
                {allusers && allusers.map(pat => (
                    <UserItem key={pat._id} user={pat} />
                ))}
            </div>
        </>
    )
}

AllUsers.propTypes = {
    getUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getUsers })(AllUsers);

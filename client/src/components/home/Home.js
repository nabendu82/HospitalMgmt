import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './home.css';

const Home = ({auth: { isAuthenticated, loading, user }}) => {
    return (
        <div className="home-flex">
            <Link to='/add-patient' className="home-btn home-light">Patient Registration</Link>
            <Link to='/patients/me' className="home-btn home-light">Patient List</Link>
            {!loading && isAuthenticated && user && user.role === "Admin" && (
                <Link to='/patients' className="home-btn home-light">All Patient List</Link>
            )}
            <div className="home-light inner-home-flex">
                <div>
                    <div className="inner-home-btn">Need help?</div>
                    <p>Get in touch with your Account Manager.</p>
                    <p>(or) Call: +918796543210</p>
                </div>
            </div>
        </div>
    )
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Home);

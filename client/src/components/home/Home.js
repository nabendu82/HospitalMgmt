import React from 'react'
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="home-flex">
            <Link to='/add-patient' className="home-btn home-light">Patient Registration</Link>
            <Link to='/patients/me' className="home-btn home-light">Patient List</Link>
            <Link to='/patients' className="home-btn home-light">Patient Status</Link>
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

export default Home

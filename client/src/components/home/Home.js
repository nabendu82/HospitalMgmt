import React from 'react'
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="home-flex">
            <Link to='/add-patient' className="home-btn home-light">Patient Registration</Link>
            <Link to='/patients' className="home-btn home-light">Patient List</Link>
            <Link to='/login' className="home-btn home-light">Patient Status</Link>
        </div>
    )
}

export default Home

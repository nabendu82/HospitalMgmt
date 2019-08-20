import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getHospital } from "../../actions/hospital";

const Hospital = ({ getHospital, hospital: { hospital, loading }, match }) => {

    useEffect(() => {
        getHospital(match.params.id);
    }, [getHospital]);

    return loading || hospital === null ? (
        <Spinner />
    ) : (

            <>
                <Link to='/hospitals' className='btn'>
                    Back To Hospitals
                </Link>
                <div className='form'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={hospital.name}
                        readOnly
                    />
                    <label htmlFor='area'>Area</label>
                    <input
                        type='text'
                        id='area'
                        name='area'
                        value={hospital.area}
                        readOnly
                    />
                    <label htmlFor='city'>City</label>
                    <input
                        type='text'
                        id='city'
                        name='city'
                        value={hospital.city}
                        readOnly
                    />
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        id='country'
                        name='country'
                        value={hospital.country}
                        readOnly
                    />
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                        type='text'
                        id='mobile'
                        name='mobile'
                        value={hospital.mobile}
                        readOnly
                    />
                    <label htmlFor='email'>email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={hospital.email}
                        readOnly
                    />
                </div>
            </>
        );
}

Hospital.propTypes = {
    getHospital: PropTypes.func.isRequired,
    hospital: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    hospital: state.hospital
});

export default connect(mapStateToProps, { getHospital })(Hospital);


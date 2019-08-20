import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import HospitalItem from './HospitalItem';
import { getHospitals } from '../../actions/hospital';

const AllHospitals = ({ getHospitals, hospital: { allhospitals, loading } }) => {
    useEffect(() => {
        getHospitals();
    }, [getHospitals]);
    console.log(allhospitals);
    return loading ? <Spinner /> : (
        <>
            <h1 className='large text-primary'>All Hospitals</h1>
            <p className='lead'>
                <i className='fas fa-user' /> All Hospitals records
            </p>
            <div className='patients'>
                {allhospitals && allhospitals.map(host => (
                    <HospitalItem key={host._id} hospital={host} />
                ))}
            </div>
        </>
    )
}

AllHospitals.propTypes = {
    getHospitals: PropTypes.func.isRequired,
    hospital: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    hospital: state.hospital
});

export default connect(mapStateToProps, { getHospitals })(AllHospitals);

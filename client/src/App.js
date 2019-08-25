import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Forgot from './components/auth/Forgot';
import Alert from './components/layout/Alert';
import Home from './components/home/Home';
import Patients from './components/patients/Patients';
import AllPatients from './components/patients/AllPatients';
import AllHospitals from './components/hospitals/AllHospitals';
import AllUsers from './components/auth/AllUsers';
import Patient from './components/patient/Patient';
import Hospital from './components/hospitals/Hospital';
import PatientForm from './components/patients/PatientForm';
import HospitalForm from './components/hospitals/HospitalForm';
import EditPatientForm from './components/patients/EditPatientForm';
import EditHospitalForm from './components/hospitals/EditHospitalForm';
import EditUserForm from './components/auth/EditUserForm';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/forgot' component={Forgot} />
              <PrivateRoute exact path='/home' component={Home} />
              <PrivateRoute exact path='/add-patient' component={PatientForm} />
              <PrivateRoute exact path='/patients' component={AllPatients} />
              <PrivateRoute exact path='/add-hospital' component={HospitalForm} />
              <PrivateRoute exact path='/hospitals' component={AllHospitals} />
              <PrivateRoute exact path='/patients/me' component={Patients} />
              <PrivateRoute exact path='/users' component={AllUsers} />
              <PrivateRoute exact path='/edit-patient/:id' component={EditPatientForm} />
              <PrivateRoute exact path='/edit-hospital/:id' component={EditHospitalForm} />
              <PrivateRoute exact path='/edit-user/:id' component={EditUserForm} />
              <PrivateRoute exact path='/patients/:id' component={Patient} />
              <PrivateRoute exact path='/hospitals/:id' component={Hospital} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  )
};

export default App;

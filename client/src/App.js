import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Home from './components/home/Home';
import Patients from './components/patients/Patients';
import AllPatients from './components/patients/AllPatients';
import Patient from './components/patient/Patient';
import PatientForm from './components/patients/PatientForm';
import EditPatientForm from './components/patients/EditPatientForm';
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
              <PrivateRoute exact path='/home' component={Home} />
              <PrivateRoute exact path='/add-patient' component={PatientForm} />
              <PrivateRoute exact path='/patients' component={AllPatients} />
              <PrivateRoute exact path='/patients/me' component={Patients} />
              <PrivateRoute exact path='/edit-patient/:id' component={EditPatientForm} />
              <PrivateRoute exact path='/patients/:id' component={Patient} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  )
};

export default App;

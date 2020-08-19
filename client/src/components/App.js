import React from 'react';
import {
  BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import '../styles/App.css';

import AlertState from '../context/alert/AlertState';

import Navbar from './layout/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import Send from './pages/Send';
import Alerts from './layout/Alerts';

const App = () => {
  return (
    <Router>
      <AlertState>
        <Navbar />
        <Alerts />
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/send'>
            <Send />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
      </AlertState>
    </Router>
  );
};

export default App;
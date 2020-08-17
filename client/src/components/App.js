import React from 'react';
import {
  BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import '../styles/App.css';

import Navbar from './layout/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import Send from './pages/Send';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
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
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import {
  BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import '../styles/App.css';

import Login from './auth/Login';
import Register from './auth/Register';
import Send from './pages/Send';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/send'>
            <Send />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
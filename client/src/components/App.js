import React from 'react';
import {
  BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import '../styles/App.css';

import { AlertState } from '../context/alert/AlertContext';

import Navbar from './layout/Navbar';
import Auth from './auth/Auth';
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
            <Auth isLogin={false} />
          </Route>
          <Route path='/send'>
            <Send />
          </Route>
          <Route path='/'>
            <Auth isLogin={true} />
          </Route>
        </Switch>
      </AlertState>
    </Router>
  );
};

export default App;
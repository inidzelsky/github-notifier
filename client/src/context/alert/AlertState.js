import React, { useReducer } from 'react';
import uuid from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from '../types';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

const AlertState = props => {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (alert, timeout = 5000) => {
    alert.id = uuid.v4();
    dispatch({type: SET_ALERT, payload: alert});

    setTimeout(dispatch, timeout, {type: REMOVE_ALERT, payload: alert.id});
  }

  return (
    <AlertContext.Provider value={{alerts: state, setAlert}}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
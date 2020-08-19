import React, { useContext } from 'react';

import AlertContext from '../../context/alert/AlertContext';

import Alert from './Alert';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <div className='container'>
      {alerts.map(alert => <Alert alert={alert}/>)}
    </div>
  );
};

export default Alerts;
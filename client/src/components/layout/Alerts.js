import React, { useContext } from 'react';

import AlertContext from '../../context/alert/AlertContext';

import Alert from './Alert';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <div className='container'>
      {alerts.map(alert => <Alert {...{key: alert.id, alert}}/>)}
    </div>
  );
};

export default Alerts;
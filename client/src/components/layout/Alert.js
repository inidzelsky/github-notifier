import React from 'react';

const Alert = props => {
  const { alert: { type, msg, width } } = props;
  const alertClassName = `alert alert-${type}`;

  return (
    <div className='container' style={{width}}>
      <div className={alertClassName}>
        <i className='fas fa-exclamation-circle'/>
        {' '}
        <strong>{msg}</strong>
      </div>
    </div>
  );
};

export default Alert;
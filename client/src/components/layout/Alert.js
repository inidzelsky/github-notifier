import React from 'react';

const Alert = ({ alert: { type, msg } }) => (
  <div className='container' style={{width: '1000px'}}>
      <div className={`alert alert-${type}`}>
        <i className='fas fa-exclamation-circle'/>
        <strong>{msg}</strong>
      </div>
    </div>
);

export default Alert;
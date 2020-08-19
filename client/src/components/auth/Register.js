import React, { useState } from 'react';

import RegisterForm from '../forms/RegisterForm';
import User from './User';

const Register = () => {
  const [response, setResponse] = useState(null);

  return (response ?
    <User data={response}/> :
    <RegisterForm setResponse={setResponse}/>
    );
};

export default Register;
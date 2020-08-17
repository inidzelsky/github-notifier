import React, { useState } from 'react';

import RegisterForm from '../forms/RegisterForm';
import Response from './Response';

const Register = () => {
  const [response, setResponse] = useState(null);

  return (response ?
    <Response data={response}/> :
    <RegisterForm setResponse={setResponse}/>
    );
};

export default Register;
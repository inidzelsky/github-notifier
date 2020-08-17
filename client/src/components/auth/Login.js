import React, { useState } from 'react';

import LoginForm from '../forms/LoginForm';
import Response from './Response';

const Login = () => {
  const [response, setResponse] = useState(null);

  return(
    response ?
      <Response data={response} /> :
      <LoginForm setResponse={setResponse}/>
  );
};

export default Login;
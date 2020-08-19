import React, { useState } from 'react';

import LoginForm from '../forms/LoginForm';
import User from './User';

const Login = () => {
  const [response, setResponse] = useState(null);

  return(
    response ?
      <User data={response} /> :
      <LoginForm setResponse={setResponse}/>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';

import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import User from './User';

const Auth = ({ isLogin }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setResponse(null);
  }, [isLogin]);

  const Form = isLogin ? LoginForm : RegisterForm;
  return(
    response ?
      <User data={response} /> :
      <Form {...{setResponse}}/>
  );
};

export default Auth;
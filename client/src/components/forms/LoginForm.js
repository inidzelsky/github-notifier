import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';

import AlertContext from '../../context/alert/AlertContext';

const LoginForm = ({ setResponse }) => {
  const { setAlert } = useContext(AlertContext);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChange = ({ target }) => setUser({...user, [target.name]: target.value});

  const onSubmitClb = async e => {
    try {
      e.preventDefault();

      if (!(user.password && user.email)) {
        const msg = (!user.email ? 'Email' : 'Password') + ' is not provided';
        return setAlert({ type: 'danger', msg });
      }

      const { data } = await axios.post('http://127.0.0.1/api/login', user);
      setResponse(data);
    } catch(e) {
      const { msg } = e.response.data;
      setAlert({type:'danger', msg});

      console.error(e.message);
    }
  };

  const onSubmit = useCallback(onSubmitClb, [user]);

  return(
    <div className={'container'} style={{width: '500px'}}>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Email</label>
          <input className='form-control' name="email" type="email" value={user.email} onChange={onChange}/>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input className={'form-control'} name="password" type="password" value={user.password} onChange={onChange}/>
        </div>
        <button type="submit" className={'btn btn-primary'}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
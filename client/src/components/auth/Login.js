import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const onSubmit = async e => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post('http://127.0.0.1/login', user, config);
      console.log(res.data);
    } catch(e) {
      console.error(e.message);
    }
  };

  return (
    (<div className={'container'}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Email</label>
          <input className={'form-control'} name="email" type="email" value={email}  onChange={onChange}/>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input className={'form-control'} name="password" type="password" value={password} onChange={onChange}/>
        </div>
        <button type="submit" className={'btn btn-primary'}>Login</button>
      </form>
    </div>)
  );
};

export default Login;
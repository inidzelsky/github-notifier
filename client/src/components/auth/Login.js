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
    (<div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input name="email" type="email" value={email}  onChange={onChange}/>
        <label>Password</label>
        <input name="password" type="password" value={password} onChange={onChange}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>)
  );
};

export default Login;
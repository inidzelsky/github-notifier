import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // Auth state
  const { email, password } = user;

  // Avatar state
  const [avatar, setAvatar] = useState(null);

  const onAuthChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const onAvatarChange = e => {
    setAvatar(e.target.files[0]);
  }

  const onSubmit = async e => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('email', email);
      formData.append('password', password);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const res = await axios.post('http://127.0.0.1/register', formData, config);
      console.log(res.data);
    } catch(e) {
      console.error(e.message);
    }
  };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Avatar</label>
          <input name="avatar" type="file" className='form-control-file' onChange={onAvatarChange}/>
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input name="email" type="email" value={email} className='form-control' onChange={onAuthChange}/>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input name="password" type="password" value={password} className='form-control' onChange={onAuthChange}/>
        </div>
        <button type='submit' className='btn btn-primary'>Register</button>
      </form>
    </div>
  );
};

export default Register;
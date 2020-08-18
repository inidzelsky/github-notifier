import React, { useState } from 'react';
import axios from "axios";

const RegisterForm = props => {
  const { setResponse } = props;

  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onAuthChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const onAvatarChange = e => {
    setAvatar(e.target.files[0]);
  };

  const onSubmit = async e => {
    try {
      e.preventDefault();

      if (!avatar || !email.trim() || !password.trim())
        return;

      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('email', email);
      formData.append('password', password);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const res = await axios.post('http://127.0.0.1/api/register', formData, config);
      setResponse(res.data);
    } catch(e) {
      console.error(e.message);
    }
  }

  return (
    <div className='container' style={{width: '500px'}}>
      <h1 className='text-center'>Register</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Avatar</label>
          <div className='custom-file'>
            <label htmlFor="avatar" className='custom-file-label'>Click to add your avatar</label>
            <input name="avatar" type="file" className='custom-file-input' onChange={onAvatarChange}/>
          </div>
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
}

export default RegisterForm;
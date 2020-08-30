import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';

import AlertContext from '../../context/alert/AlertContext';

const RegisterForm = ({ setResponse }) => {
  const { setAlert } = useContext(AlertContext);

  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onAuthChange = ({ target }) => {
    setUser({...user, [target.name]: target.value});
  };

  const onAvatarChange = ({ target }) => {
    setAvatar(target.files[0]);
  };

  const onSubmitClb = async e => {
    try {
      e.preventDefault();

      if (!(avatar && user.email && user.password)) {
        const msg = (!avatar ? 'Avatar' : (!user.email ? 'Email' : 'Password')) + ' is not provided';
        return setAlert({ type: 'danger', msg });
      }

      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('email', user.email);
      formData.append('password', user.password);

      const { data } = await axios.post('http://127.0.0.1/api/register', formData);
      setResponse(data);
    } catch(e) {
      const { msg } = e.response.data;
      setAlert({type: 'danger', msg});

      console.error(e.message);
    }
  }

  const onSubmit = useCallback(onSubmitClb, [avatar, user]);

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
          <input name="email" type="email" value={user.email} className='form-control' onChange={onAuthChange}/>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input name="password" type="password" value={user.password} className='form-control' onChange={onAuthChange}/>
        </div>
        <button type='submit' className='btn btn-primary'>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
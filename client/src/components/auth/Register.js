import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // Auth state
  const { email, password } = user;

  const onAuthChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  // Avatar state
  const [avatar, setAvatar] = useState(null);

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
    } catch(e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Avatar</label>
        <input name="avatar" type="file" onChange={onAvatarChange}/>
        <label>Email</label>
        <input name="email" type="email" value={email}  onChange={onAuthChange}/>
        <label>Password</label>
        <input name="password" type="password" value={password} onChange={onAuthChange}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default Register;
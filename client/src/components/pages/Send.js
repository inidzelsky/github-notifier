import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Send = () => {
  const [token, setToken] = useState('');
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);

  const onChange = cb => e => cb(e.target.value);

  const onClick = e => {
    e.preventDefault();
    setUsernames([...usernames, username]);
    setUsername('');
  };

  const onSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const formData = {
      token,
      text,
      usernames
    };

    const res = await axios.post('http://127.0.0.1/send', formData, config);
    console.log(res.data);
  }

  return (
    <div className='container'>
      <h1>Send</h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Token</label>
            <input type={'text'} name={'token'} value={token} className='form-control' onChange={onChange(setToken)}/>
          </div>
          <div className='form-group'>
            <label>Text</label>
            <input type={'text'} name={'text'} value={text} className='form-control' onChange={onChange(setText)} />
          </div>
          <label>Usernames</label>
          <div className='form-row'>
            <div className='form-group col-6'>
              <select multiple className='form-control'>
                {usernames.map(u => <option>{u}</option>)}
              </select>
            </div>
            <div className='form-group col-6'>
              <input name={'username'} value={username} type={'text'} className='form-control mb-3' onChange={onChange(setUsername)}/>
              <button className='btn btn-danger col-6'>Remove username</button>
              <button onClick={onClick} className='btn btn-dark col-6'>Add username</button>
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>Send</button>
        </form>
    </div>
  );
};

export default Send;
import React, { useState, useContext } from 'react';
import axios from 'axios';

import AlertContext from '../../context/alert/AlertContext';

const SendForm = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { setResponse } = props;

  const [token, setToken] = useState('');
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [currentUsername, setCurrentUsername] = useState(null);

  const onChange = cb => e => cb(e.target.value);

  const onSelectChange = e => {
    e.preventDefault();

    setCurrentUsername(e.target.value);
  }

  const onAddClick = e => {
    e.preventDefault();

    if (username.trim() === '')
      return;

    setUsernames([...usernames, username]);
    setUsername('');
  };

  const onRemoveClick = e => {
    e.preventDefault();

    if (currentUsername === null)
      return;

    const filteredUsernames = usernames.filter(val => val !== currentUsername);
    setUsernames(filteredUsernames);

    if (filteredUsernames.length)
      setCurrentUsername(filteredUsernames[0]);
    else
      setCurrentUsername(null);
  }

  const onSubmit = async e => {
    try {
      e.preventDefault();

      if (!token.trim() || !text.trim() || !usernames.length)
        return;

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

      const res = await axios.post('http://127.0.0.1/api/send', formData, config);
      setResponse(res.data);
    } catch(e) {
      const { msg } = e.response.data;
      setAlert({type: 'danger', msg});

      console.error(e.message);
    }
  };

  return (
    <div className='container' style={{width: '750px'}}>
      <h1>Send</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Token</label>
          <input type='text' name='token' value={token} className='form-control' onChange={onChange(setToken)}/>
        </div>
        <div className='form-group'>
          <label>Text</label>
          <input type='text' name='text' value={text} className='form-control' onChange={onChange(setText)} />
        </div>
        <label>Usernames</label>
        <div className='form-row'>
          <div className='form-group col-sm-6'>
            <select selected={currentUsername} onChange={onSelectChange} multiple className='custom-select' style={{height: '130px'}}>
              {usernames.map(u => <option>{u}</option>)}
            </select>
          </div>
          <div className='form-group col-sm-6'>
            <input name='username' value={username} type='text' className='form-control mb-3' onChange={onChange(setUsername)}/>
            <div className="btn-group-vertical btn-block">
              <button onClick={onAddClick} className='btn btn-dark'>Add username</button>
              <button onClick={onRemoveClick} className='btn btn-danger'>Remove username</button>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>Send</button>
      </form>
    </div>
  );
};

export default SendForm;
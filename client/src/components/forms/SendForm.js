import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';

import AlertContext from '../../context/alert/AlertContext';

const SendForm = ({ setResponse }) => {
  const { setAlert } = useContext(AlertContext);

  const [token, setToken] = useState('');
  const [text, setText] = useState('');
  const [usernames, setUsernames] = useState({
    selectedUsernames: [],
    inputUsername: '',
    currentUsername
  });

  const { inputUsername, currentUsername, selectedUsernames } = usernames;

  const handleInput = name => ({ target }) => {
    const names = {
      token: setToken,
      text: setText,
      username: value => setUsernames({ ...usernames, inputUsername: value })
    };

    const handler = names[name];
    handler(target.value);
  };

  const onSelectChange = e => {
    e.preventDefault();

    setUsernames({ ...usernames, currentUsername: e.target.value });
  };

  const onAddClick = e => {
    e.preventDefault();

    if (inputUsername.trim() === '')
      return setAlert({ type: 'danger', msg: 'Username can`t be an empty string' });

    if (selectedUsernames.includes(inputUsername))
      return setAlert({ type: 'danger', msg: 'Usernames should be unique' });

    setUsernames({
      ...usernames,
      selectedUsernames: [...selectedUsernames, inputUsername],
      inputUsername: ''
    });
  };

  const onRemoveClick = e => {
    e.preventDefault();

    if (!currentUsername)
      return setAlert({ type: 'warning', msg: 'No username selected' });

    const filteredUsernames = selectedUsernames.filter(val => val !== currentUsername);
    setUsernames({ ...usernames, selectedUsernames: filteredUsernames, currentUsername: undefined });
  };

  const onSubmitClb = async e => {
    try {
      e.preventDefault();

      if (!(token && text)) {
        const msg = (!token ? 'Token' : 'Text') + ' is not provided';
        return setAlert({ type: 'danger', msg });
      }

      if (!selectedUsernames.length)
        return setAlert({ type: 'danger', msg: 'Usernames list is empty' });

      const formData = {
        token,
        text,
        usernames: selectedUsernames
      };

      const { data } = await axios.post('http://127.0.0.1/api/send', formData);
      setResponse(data);
    } catch(e) {
      const { msg } = e.response.data;
      setAlert({type: 'danger', msg });

      console.error(e.message);
    }
  };

  const onSubmit = useCallback(onSubmitClb, [token, text, usernames]);

  return (
    <div className='container' style={{width: '750px'}}>
      <h1 className='text-center'>Send</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Token</label>
          <input type='text' name='token' value={token} className='form-control' onChange={handleInput('token')}/>
        </div>
        <div className='form-group'>
          <label>Text</label>
          <input type='text' name='text' value={text} className='form-control' onChange={handleInput('text')} />
        </div>
        <label>Usernames</label>
        <div className='form-row'>
          <div className='form-group col-sm-6'>
            <select selected={currentUsername} onChange={onSelectChange} multiple className='custom-select' style={{height: '130px'}}>
              {selectedUsernames.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div className='form-group col-sm-6'>
            <input name='username' value={inputUsername} type='text' className='form-control mb-3' onChange={handleInput('username')}/>
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
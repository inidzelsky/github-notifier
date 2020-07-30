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
    <div>
      <h1>Send</h1>
        <form onSubmit={onSubmit}>
          <label>Token</label>
          <input type={'text'} name={'token'} value={token} onChange={onChange(setToken)}/>
          <label>Text</label>
          <input type={'text'} name={'text'} value={text} onChange={onChange(setText)} />
          <table>
            <tbody>
            <tr><th>Usernames:</th></tr>
            {usernames.map(name => <tr><td>{name}</td></tr>)}
            </tbody>
          </table>
          <label>New username:</label>
          <input name={'username'} value={username} type={'text'} onChange={onChange(setUsername)}/>
          <button onClick={onClick}>Add username</button>
          <input type={'submit'} value={'Submit'}/>
        </form>
    </div>
  );
};

export default Send;
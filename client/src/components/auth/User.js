import React, { useRef } from 'react';

const User = ({ data: { email, token, thumbnailUrl, avatarUrl }}) => {
  return (
    <div className='container mt-sm-3' style={{width: '750px'}}>
      <h1 className='text-center'>User`s info: </h1>
      <form>
        <Token token={token}/>
        <Url label='Avatar Url' type='url' value={avatarUrl}/>
        <Url label='Thumbnail Url' type='url' value={thumbnailUrl}/>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' value={email} className='form-control' disabled/>
        </div>
      </form>
    </div>
  );
};

const Url = ({ label, value, type }) => {
  const onClick = e => {
    e.preventDefault();

    const url = /http:\/\//.test(value) ? value :  'http://' + value;
    window.open(url, '_blank');
  };

  return (
    <div className='form-group'>
      <label>{label}</label>
      <button onClick={onClick} className='btn btn-block p-0'>
        <input {...{value, type}} className='form-control' disabled/>
      </button>
    </div>
  );
};

const Token = ({ token }) => {
  const inputRef = useRef(null);
  const onClick = e => {
    e.preventDefault();

    inputRef.current.focus();
    inputRef.current.select();

    document.execCommand('copy');

    inputRef.current.blur();
    window.getSelection().removeAllRanges();
  };

  return (
    <div className='form-group'>
      <label>Token</label>
      <div className='form-row'>
          <div className='col-sm-11'>
            <input ref={inputRef} value={token} className='form-control' type='text' readOnly />
          </div>
          <div className='col-sm-1'>
            <button onClick={onClick} className='btn btn-outline-secondary'><i className="far fa-copy"></i></button>
          </div>
      </div>
    </div>
  );
};

export default User;
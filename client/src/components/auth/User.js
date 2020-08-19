import React from 'react';

const Response = props => {
  const { data: { email, token, thumbnailUrl, avatarUrl } } = props;

  return (
    <div className='container mt-sm-3' style={{width: '750px'}}>
      <h1 className='text-center'>User`s info: </h1>
      <form>
        <div className='form-group'>
          <label>Token</label>
          <input type='text' value={token} className='form-control' disabled/>
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' value={email} className='form-control' disabled/>
        </div>
        <div className='form-group'>
          <label>Avatar url</label>
          <input type='url' value={avatarUrl} className='form-control' disabled/>
        </div>
        <div className='form-group'>
          <label>Thumbnail url</label>
          <input type='url' value={thumbnailUrl} className='form-control' disabled/>
        </div>
      </form>
    </div>
  );
};

export default Response;
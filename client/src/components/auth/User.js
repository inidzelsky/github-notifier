import React from 'react';

const User = ({ data: { email, token, thumbnailUrl, avatarUrl }}) => {
  const inputFields = [
    ['Token', 'text', token],
    ['Email', 'text', email],
    ['Avatar url', 'url', avatarUrl],
    ['Thumbnail url', 'url', thumbnailUrl]
  ].map(([label, type, value]) => ({ label, type, value }));

  return (
    <div className='container mt-sm-3' style={{width: '750px'}}>
      <h1 className='text-center'>User`s info: </h1>
      <form>
        { inputFields.map(({ label, type, value }, i) => (
          <div key={i} className='form-group'>
            <label>{label}</label>
            <input {...{value, type}} className='form-control' disabled/>
        </div>
        )) }
      </form>
    </div>
  );
};

export default User;
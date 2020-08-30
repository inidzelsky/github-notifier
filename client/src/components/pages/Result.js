import React from 'react';

const Result = props => {
  const { result } = props;

  return (
    <div className='container mt-sm-3' style={{width: '1000px'}}>
      <h1 className='text-center'>Result</h1>
      <table className='table table-striped table-bordered mt-sm-3'>
        <thead>
          <tr>
            <th>
              Username
            </th>
            <th>
              Info
            </th>
          </tr>
        </thead>
        <tbody>
          { result.map(field =>
              (<tr key={field.username}>
                <td>{field.username}</td>
                <td>{field.msg}</td>
              </tr>) )}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
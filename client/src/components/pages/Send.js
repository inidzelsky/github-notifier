import React, { useState } from 'react';

import SendForm from '../forms/SendForm';
import Result from './Result';

const Send = () => {
  const [response, setResponse] = useState(null);

  return (
    response ?
      <Result result={response.result}/> :
      <SendForm setResponse={setResponse}/>
  );
};

export default Send;
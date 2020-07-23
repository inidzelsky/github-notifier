'use strict';

const genError = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  return e;
};

module.exports = {
  genError
};

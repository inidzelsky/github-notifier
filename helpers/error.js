'use strict';

const genError = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  return e;
};

const handleError = (e, ctx) => {
  const status = e.status || 500;

  // Error log
  console.log('Error occurred');
  console.dir({
    errorStatus: status,
    errorMessage: e.message
  });

  // Response
  ctx.status = status;

  if (ctx.status === 500)
    return ctx.body = { msg: 'Server error occurred' };
  ctx.body = { msg: e.message };
};

module.exports = {
  genError,
  handleError
};

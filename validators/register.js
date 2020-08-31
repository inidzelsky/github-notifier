'use strict';

const path = require('path');

const { isEmail, isLength } =
  require(path.join(__dirname, 'validationHelpers'));

const validate = ({ email, password, avatar }, ctx) => {
  if (!avatar)
    ctx.throw(422, 'Avatar is not provided');

  if (!(email && password)) {
    const msg = (!email ? 'Email' : 'Password') + ' is not provided';
    ctx.throw(422, msg);
  }

  if (!isEmail(email))
    ctx.throw(422, 'Email is invalid');

  if (!isLength(password, { min: 6 }))
    ctx.throw(422, 'Password is too short');
};

module.exports = validate;

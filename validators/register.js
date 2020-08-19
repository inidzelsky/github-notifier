'use strict';

const validator = require('validator');

const validate = ({ email, password, avatar }, ctx) => {
  if (!avatar)
    ctx.throw(422, 'Avatar is not provided');

  if (!email || !password) {
    const msg = (!email ? 'Email' : 'Password') + ' is not provided';
    ctx.throw(422, msg);
  }

  if (!validator.isEmail(email))
    ctx.throw(422, 'Email is broken');

  if (!validator.isLength(password, { min: 6 }))
    ctx.throw(422, 'Password is too short');
};

module.exports = validate;

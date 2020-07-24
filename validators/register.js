'use strict';

const path = require('path');
const validator = require('validator');

const  { genError } = require(path.join(__dirname, '..', 'utils', 'utils'));

const validate = (email, password, avatar) => {
  if (!email || !password) {
    const message = (!email ? 'Email' : 'Password') + ' is not provided';
    const e = genError(402, message);
    throw e;
  }

  if (!avatar) {
    const e = genError(402, 'Avatar is not provided');
    throw e;
  }

  if (!validator.isEmail(email)) {
    const e = genError(406, 'Email is broken');
    throw e;
  }

  if (!validator.isLength(password, { min: 6 })) {
    const e = genError(400, 'Password  is too short');
    throw e;
  }
};

module.exports = validate;

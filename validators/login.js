'use strict';

const path = require('path');
const validator = require('validator');

const  { genError } = require(path.join(__dirname, '..', 'utils', 'utils'));

const validate = (email, password) => {
  if (!email || !password) {
    const message = (!email ? 'Email' : 'Password') + ' is not provided';
    throw genError(402, message);
  }

  if (!validator.isEmail(email)) {
    throw genError(406, 'Email is broken');
  }

  if (!validator.isLength(password, { min: 6 })) {
    throw genError(400, 'Password is too short');
  }
};

module.exports = validate;

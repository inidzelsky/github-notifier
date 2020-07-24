'use strict';

const path = require('path');
const validator = require('validator');

const  { genError } = require(path.join(__dirname, '..', 'helpers', 'error'));

const validate = (email, password) => {
  if (!email || !password) {
    const message = (!email ? 'Email' : 'Password') + ' is not provided';
    throw genError(422, message);
  }

  if (!validator.isEmail(email)) {
    throw genError(422, 'Email is broken');
  }

  if (!validator.isLength(password, { min: 6 })) {
    throw genError(422, 'Password is too short');
  }
};

module.exports = validate;

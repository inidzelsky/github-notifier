'use strict';

const validator = require('validator');

const isUnique = array => {
  for (const c of array) {
    const filtered = array.filter(v => v !== c);
    if (array.length - filtered.length > 1)
      return false;
  }

  return true;
};

const validate = ({ text, usernames }, ctx) => {
  if (validator.isEmpty(text))
    ctx.throw(422, 'Text is absent');

  if (!usernames.length)
    ctx.throw(422, 'No usernames are provided');

  if (!isUnique(usernames))
    ctx.throw(422, 'Usernames must be unique');
};

module.exports = validate;

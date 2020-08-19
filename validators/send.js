'use strict';

const validator = require('validator');

const validate = ({ text, usernames }, ctx) => {
  if (validator.isEmpty(text))
    ctx.throw(422, 'Text is absent');

  if (!usernames.length)
    ctx.throw(422, 'No usernames are provided');
};

module.exports = validate;

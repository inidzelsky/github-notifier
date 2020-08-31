'use strict';

const path = require('path');

const { isEmpty, isUnique } =
  require(path.join(__dirname, 'validationHelpers'));

const validate = ({ text, usernames }, ctx) => {
  if (isEmpty(text))
    ctx.throw(422, 'Text is absent');

  if (!usernames.length)
    ctx.throw(422, 'No usernames are provided');

  if (!isUnique(usernames))
    ctx.throw(422, 'Usernames must be unique');
};

module.exports = validate;

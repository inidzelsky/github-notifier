'use strict';

const path = require('path');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require(path.join(__dirname, '..', 'config'));

const protectedMiddleware = async (ctx, next) => {
  try {
    if (!ctx.request.body.token)
      ctx.throw(401, 'Token is absent');

    const { token } = ctx.request.body;
    await jwt.verify(token, jwtSecret);
  } catch(e) {
    ctx.throw(401, 'Token is wrong');
  }

  await next();
};

module.exports = protectedMiddleware;
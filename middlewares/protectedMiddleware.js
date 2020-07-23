'use strict';

const path = require('path');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require(path.join(__dirname, '..', 'config'));

const protectedMiddleware = async (ctx, next) => {
  try {
    if (!ctx.request.body.token) {
      ctx.status = 401;
      return ctx.body = { msg: 'Token is absent' };
    }

    const { token } = ctx.request.body;
    jwt.verify(token, jwtSecret);

    await next();
  } catch(e) {
    ctx.status = 401;
    ctx.body = { msg: 'Token is wrong' };
  }
};

module.exports = protectedMiddleware;
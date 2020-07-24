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
    await jwt.verify(token, jwtSecret);

    await next();
  } catch(e) {
    console.log(e);
    ctx.status = 401;
    ctx.body = { msg: 'Token is wrong' };
  }
};

module.exports = protectedMiddleware;
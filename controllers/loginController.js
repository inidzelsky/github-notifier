'use strict';

const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Get config values
const config = require(path.join(__dirname, '..', 'config'));
const { jwtSecret, avatarsPath, thumbnailsPath } = config;

// Get helper functions
const { genError } = require(path.join(__dirname, '..', 'utils', 'utils'));

// Get user model
const User = require(path.join(__dirname, '..', 'models', 'User'));

const loginUser = async ctx => {
  try {
    // Request data validation
    validate(ctx.request.body.email, ctx.request.body.password);

    const { email, password } = ctx.request.body;

    // Get user from the db
    const user = await User.findByEmail(email);
    if (!user) {
      const e = genError(404, 'User was not found');
      throw e;
    }

    const { userid, avatar, thumbnail } = user;

    // Verifying password
    const hashPassword = user.password;

    if (!(await bcrypt.compare(password, hashPassword))) {
      const e = genError(401, 'Invalid password');
      throw e;
    }

    // Give token
    const payload = {
      user: {
        userId: userid
      }
    };

    const token = jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: 360000
      });

    const avatarUrl = path.join(ctx.request.host, avatarsPath, avatar);
    const thumbnailUrl = path.join(ctx.request.host, thumbnailsPath, thumbnail);

    ctx.body = {
      avatarUrl,
      thumbnailUrl,
      email,
      token
    };
  } catch(e) {
    console.log(e.message);

    ctx.status = e.status || 500;

    if (ctx.status === 500)
      return ctx.body = { msg: 'Server error occured' };
    ctx.body = { msg: e.message };
  }
};

const validate = (email, password) => {
  const e = new Error();

  if (!email || !password) {
    const message = (!email ? 'Email' : 'Password') + ' is not provided';
    const e = genError(402, message);
    throw e;
  }

  if (!validator.isEmail(email)) {
    const e = genError(406, 'Email is broken');
    throw e;
  }

  if (!validator.isLength(password, { min: 6 })) {
    const e = genError(400, 'Password is too short');
    throw e;
  }
}

module.exports = {
  loginUser
};
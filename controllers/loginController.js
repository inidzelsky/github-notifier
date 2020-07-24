'use strict';

const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get config values
const config = require(path.join(__dirname, '..', 'config'));
const { jwtSecret, avatarsPath, thumbnailsPath } = config;

// Get helper functions
const { genError } = require(path.join(__dirname, '..', 'utils', 'utils'));

//Get validator
const validate = require(path.join(__dirname, '..', 'validators', 'login'));

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
      throw genError(404, 'User was not found');
    }

    const { userid, avatar, thumbnail } = user;

    // Verifying password
    const hashPassword = user.password;

    if (!(await bcrypt.compare(password, hashPassword))) {
      throw genError(401, 'Invalid password');
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

module.exports = {
  loginUser
};
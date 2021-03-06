'use strict';

const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get config values
const config = require(path.join(__dirname, '..', 'config'));
const { jwtSecret, avatarsPath, thumbnailsPath } = config;

//Get validator
const validate = require(path.join(__dirname, '..', 'validators', 'login'));

// Get user model
const User = require(path.join(__dirname, '..', 'models', 'User'));

const loginUser = async ctx => {
  const { email, password } = ctx.request.body;

  // Request data validation
  validate({ email, password }, ctx);

  // Get user from the db
  const user = await User.findByEmail(email);
  if (!user) {
    ctx.throw(404, 'User was not found');
  }

  const { userid, avatar, thumbnail } = user;

  // Verifying password
  const hashPassword = user.password;

  if (!(await bcrypt.compare(password, hashPassword))) {
    ctx.throw(401, 'Invalid password');
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
};

module.exports = {
  loginUser
};
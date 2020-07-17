'use strict';

const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { jwtSecret } = require(path.join(__dirname, '..', 'config'));

const User = require(path.join(__dirname, '..', 'models', 'User'));

const loginUser = async ctx => {
  try {
    // Request data validation
    validate(ctx.request.body.email, ctx.request.body.password);

    const { email, password } = ctx.request.body;

    // Get user from the db
    const user = await User.findByEmail(email);
    if (!user) {
      const e = new Error();
      e.status = 404;
      e.message = 'User was not found';

      throw e;
    }

    const { userid, avatar, thumbnail } = user;

    // Verifying password
    const hashPassword = user.password;

    if (!(await bcrypt.compare(password, hashPassword))) {
      const e = new Error();
      e.status = 401;
      e.message = 'Invalid password';

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

    ctx.body = {
      avatarFileName: avatar,
      thumbnailFileName: thumbnail,
      email,
      token
    };
  } catch(e) {
    ctx.status = e.status || 500;
    ctx.body = { msg: e.message };
  }
};

const validate = (email, password) => {
  const e = new Error();

  if (!email || !password) {
    e.status = 402;
    e.message = (!email ? 'Email' : 'Password') + ' is not provided';
    throw e;
  }

  if (!validator.isEmail(email)) {
    e.status = 406;
    e.message = 'Email is broken';
    throw e;
  }

  if (!validator.isLength(password, { min: 6 })) {
    e.status = 400;
    e.message = 'Password is too short';
    throw e;
  }
}

module.exports = {
  loginUser
};
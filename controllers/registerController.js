'use strict';

const path = require('path');
const multer = require('@koa/multer');
const thumb = require('node-thumbnail').thumb;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Get config values
const config = require(path.join(__dirname, '..', 'config'));
const { jwtSecret, multerStorage, avatarsPath, thumbnailsPath } = config;

//Get models
const User = require(path.join(__dirname, '..', 'models', 'User'));

// Set "multer" options
const formatChecker =  (req, file, cb) => {
  const filetypes = /png|gif|jpeg|jpg/;
  const extCheck = filetypes
    .test(path.extname(file.originalname).toLowerCase());
  const mimeCheck = filetypes.test(file.mimetype);

  if (extCheck && mimeCheck)
    cb(null, true);
  else
    cb('Invalid picture format');
};

const storage = multer.diskStorage(multerStorage);
const upload = multer({
  storage,
  fileFilter: formatChecker
});

const registerUser = async ctx => {
  try {
    //Request data validation
    validate(ctx.request.body.email, ctx.request.body.password, ctx.request.file);

    const { email, password } = ctx.request.body;
    const avatarFileName = ctx.request.file.filename;

    // Create avatar and thumbnail file pathes
    const ext = path.extname(avatarFileName);
    const base = path.basename(avatarFileName, ext);
    const thumbnailFileName = `${base}_thumb${ext}`;

    // Create a thumbnail from the avatar
    await thumb({
      source: path.join(avatarsPath, avatarFileName),
      destination: thumbnailsPath,
      width: 100,
      quiet: true
    });

    // Generate a password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Save user into the database
    const user = new User(email, hashPassword, avatarFileName, thumbnailFileName);
    const { userId } = await user.save();

    // Give token
    const payload = {
      user: {
        userId
      }
    };

    const token = jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: 360000
      });

    // Get user`s avatar url
    const avatarUrl = path.join(ctx.request.host, avatarsPath);

    return ctx.body = {
      token,
      avatarUrl
    };
  } catch(e) {
    ctx.status = e.status || 500;
    ctx.body = { msg: e.message };

    console.log(e);
  }
};

const validate = (email, password, avatar) => {
  const e = new Error();

  if (!email || !password) {
    e.status = 402;
    e.message = (!email ? 'Email' : 'Password') + ' is not provided';
    throw e;
  }

  if (!avatar) {
    e.status = 402;
    e.message = 'Avatar is not provided';
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
  uploadAvatar: upload,
  registerUser
};
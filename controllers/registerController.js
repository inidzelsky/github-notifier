'use strict';

const path = require('path');
const multer = require('@koa/multer');
const thumb = require('node-thumbnail').thumb;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Get config values
const config = require(path.join(__dirname, '..', 'config'));
const { jwtSecret, multerStorage, avatarsPath, thumbnailsPath } = config;

// Get validator
const validate = require(path.join(__dirname, '..', 'validators', 'register'));

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
  else {
    const e = new Error();
    e.status = 422;
    e.message = 'Invalid picture format';
    cb(e);
  }
};

const storage = multer.diskStorage(multerStorage);
const upload = multer({
  storage,
  fileFilter: formatChecker
});

const registerUser = async ctx => {
  const { body: { email, password }, file } = ctx.request;

  //Request data validation
  validate({ email, password, file }, ctx);

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
  const { userId } = await user.save(ctx);

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
  const avatarUrl = path.join(ctx.request.host, avatarsPath, avatarFileName);
  const thumbnailUrl = path.join(ctx.request.host, thumbnailsPath, thumbnailFileName);

  return ctx.body = {
    token,
    email,
    avatarUrl,
    thumbnailUrl
  };
};

module.exports = {
  uploadAvatar: upload,
  registerUser
};
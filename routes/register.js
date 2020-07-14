'use strict';

const path = require('path');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const thumb = require('node-thumbnail').thumb;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Get config values
const config = require(path.join(__dirname, '..', 'config'));
const { jwtSecret, multerStorage, avatarsPath, thumbnailsPath } = config;

// Get database functions
const database = require(path.join(__dirname, '..', 'database', 'database'));
const { saveUser } = database;

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

const router = new Router();

router.post('/register', upload.single('avatar'), async ctx => {
  try {
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

    // Save user data to db
    await saveUser(email, hashPassword, avatarFileName, thumbnailFileName);

    // Get user`s avatar url
    const avatarUrl = path.join(ctx.request.host, avatarsPath);

    const payload = {
      user: {
        email,
        password
      }
    };

    const token = jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: 360000
      });

    return ctx.body = {
      token,
      avatarUrl
    };
  } catch(e) {
    console.log(e.message);
  }
});

module.exports = router;
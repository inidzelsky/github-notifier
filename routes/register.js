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
const storage = multer.diskStorage(multerStorage);
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => { // #TODO Create separate checker function
    const filetypes = /png|gif|jpeg|jpg/;
    const extCheck = filetypes
      .test(path.extname(file.originalname).toLowerCase());
    const mimeCheck = filetypes.test(file.mimetype);

    if (extCheck && mimeCheck)
      cb(null, true);
    else
      cb('Invalid picture format');
  }
});

const router = new Router();

router.post('/register', upload.single('avatar'), async ctx => {
  try {
    const { email, password } = ctx.request.body;
    const { filename } = ctx.request.file;

    // Create avatar and thumbnail file pathes
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    const thumbnailFileName = `${base}_thumb${ext}`;
    const avatarFilePath = path.join(avatarsPath, filename);
    const thumbnailFilePath = path.join(thumbnailsPath, thumbnailFileName);

    // Create a thumbnail from the avatar
    await thumb({
      source: avatarFilePath,
      destination: thumbnailsPath,
      width: 100,
      quiet: true
    });

    // Generate a password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Save user data to db
    await saveUser(email, hashPassword, avatarFilePath, thumbnailFilePath);

    const payload = {
      user: {
        email,
        password
      }
    };

    //Creating token
    const token = jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: 360000
      });

    const avatarUrl = `${ctx.request.host}/${avatarsPath}`;

    ctx.body = {
      token,
      avatarUrl
    };

  } catch(e) {
    console.log(e.message);
  }
});

module.exports = router;
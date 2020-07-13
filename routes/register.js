'use strict';

const Router = require('@koa/router');
const multer = require('@koa/multer');
const thumb = require('node-thumbnail').thumb;
const jwt = require('jsonwebtoken');
const path = require('path');


const config = require('../config');
const { jwtSecret, multerStorage } = config;

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

    const avatarUrl = ctx.request.host + '/public/avatars';

    ctx.body = {
      token,
      avatarUrl
    };

    thumb({
      source: `./public/avatars/${ctx.file.filename}`,
      destination: './public/avatars/thumbnails',
      width: 100,
      quiet: true
    });
  } catch(e) {
    console.log(e.message);
  }
});

module.exports = router;
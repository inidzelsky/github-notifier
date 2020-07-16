'use strict';

const path = require('path');
const Router = require('@koa/router');

const { uploadAvatar, registerUser } =
  require(path.join(__dirname, '..', 'controllers', 'registerController'));

const router = new Router();

router.post('/register', uploadAvatar.single('avatar'), registerUser);

module.exports = router;

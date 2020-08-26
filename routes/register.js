'use strict';

const path = require('path');
const Router = require('@koa/router');

// Middlewares
const handleErrorMiddleware =
  require(path.join(__dirname, '..', 'middlewares', 'handleErrorMiddleware'));

const { uploadAvatar, registerUser } =
  require(path.join(__dirname, '..', 'controllers', 'registerController'));

const router = new Router();

router.post(
  '/api/register',
  handleErrorMiddleware,
  uploadAvatar.single('avatar'),
  registerUser
);

module.exports = router;

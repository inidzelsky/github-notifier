'use strict';

const path = require('path');
const Router = require('@koa/router');

// Middlwares
const handleErrorMiddleware =
  require(path.join(__dirname, '..', 'middlewares', 'handleErrorMiddleware'));

const { loginUser } =
  require(path.join(__dirname, '..', 'controllers', 'loginController'));

const router = new Router();

router.post('/api/login', handleErrorMiddleware, loginUser);

module.exports = router;

'use strict';

const path = require('path');
const Router = require('@koa/router');

// Middlewares
const protectedMiddleware =
  require(path.join(__dirname, '..', 'middlewares', 'protectedMiddleware'));

const handleErrorMiddleware =
  require(path.join(__dirname, '..', 'middlewares', 'handleErrorMiddleware'));

const { sendController } =
  require(path.join(__dirname, '..', 'controllers', 'sendController'));

const router = new Router();


router.post('/api/send', handleErrorMiddleware, protectedMiddleware, sendController);

module.exports = router;

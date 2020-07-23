'use strict';

const path = require('path');
const Router = require('@koa/router');

const protectedMiddleware =
  require(path.join(__dirname, '..', 'middlewares', 'protectedMiddleware'));

const { sendController } =
  require(path.join(__dirname, '..', 'controllers', 'sendController'));

const router = new Router();


router.post('/send', protectedMiddleware, sendController);

module.exports = router;

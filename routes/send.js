'use strict';

const path = require('path');
const Router = require('@koa/router');

const { sendController } =
  require(path.join(__dirname, '..', 'controllers', 'sendController'));

const router = new Router();

router.post('/send', sendController);

module.exports = router;

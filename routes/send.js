'use strict';

const path = require('path');
const Router = require('@koa/router');

const { sendEmails } =
  require(path.join(__dirname, '..', 'controllers', 'sendController'));

const router = new Router();

router.post('/send', sendEmails);

module.exports = router;

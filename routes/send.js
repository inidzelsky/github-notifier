'use strict';

const Router = require('@koa/router');

const router = new Router();

router.post('/send', async ctx => {
  ctx.body = 'Send route';
});

module.exports = router.routes();
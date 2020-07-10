'use strict';

const Router = require('@koa/router');

const router = new Router();

router.post('/register', async ctx => {
  ctx.body = 'Register route';
});

module.exports = router.routes();
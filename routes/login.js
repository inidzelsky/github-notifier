'use strict';

const Router = require('@koa/router');

const router = new Router();

router.post('/login', async ctx => {
  ctx.body = 'Login route';
});

module.exports = router;
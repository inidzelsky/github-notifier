'use strict';

const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.post('/register', async ctx => {
  ctx.body = 'Register route';
});

router.post('/login', async ctx => {
  ctx.body = 'Login route';
});

router.post('/send', async ctx => {
  ctx.body = 'Send route';
});

app.use(router.routes());

app.listen(3000, () => console.log('Server was successfully started!'));

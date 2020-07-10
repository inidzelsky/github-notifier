'use strict';

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello, github!';
});

app.listen(3000, () => console.log('Server was successfully started!'));
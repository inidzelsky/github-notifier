'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// Body parser
app.use(bodyParser());

// Routes
app.use(require('./routes/login').routes());
app.use(require('./routes/register').routes());
app.use(require('./routes/send').routes());

app.listen(80, () => console.log('Server was successfully started!'));
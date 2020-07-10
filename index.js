'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// Body parser
app.use(bodyParser());

// Routes
app.use(require('./routes/login.js'));
app.use(require('./routes/register'));
app.use(require('./routes/send'));

app.listen(3000, () => console.log('Server was successfully started!'));

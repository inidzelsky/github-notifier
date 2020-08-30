'use strict';

// Config init
require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const cors = require('@koa/cors');

const app = new Koa();

// Server side error handling
app.on('error', e => console.log(e));

//CORS
app.use(cors());

//Static folder
app.use(serve('./public'));

// Body parser
app.use(bodyParser());

// Routes
app.use(require('./routes/login').routes());
app.use(require('./routes/register').routes());
app.use(require('./routes/send').routes());

app.listen(80, () => console.log('Server was successfully started!'));

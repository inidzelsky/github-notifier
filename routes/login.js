'use strict';

const path = require('path');
const Router = require('@koa/router');

const { loginUser } =
  require(path.join(__dirname, '..', 'controllers', 'loginController'));

const router = new Router();

router.post('api//login', loginUser);

module.exports = router;

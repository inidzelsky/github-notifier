'use strict';

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch(e) {
    ctx.status = e.status || 500;
    ctx.body = { msg: e.message };
    ctx.app.emit('error', e);
  };
};
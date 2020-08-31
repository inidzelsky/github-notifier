'use strict';

const path = require('path');

// Get postgre query function
const query = require(path.join(__dirname, '..', 'database', 'dbController'));

const User = {
  findByEmail: async function(email) {
    const queryString =
      'select user_id as userid, email, password, avatar, thumbnail ' +
      'from users ' +
      'where email = $1';

    const res = await query(
      queryString,
      [email]
    );

    if (res.rows.length)
      return res.rows[0];

    return null;
  },
  save: async function(userData, ctx) {
    const { email, password, avatarFileName, thumbnailFileName } = userData;

    // Check if user is already in db
    let user = await this.findByEmail(email);
    if (user)
      ctx.throw(409, 'User already exists');

    // Insert a new user into db
    const queryString = 'insert into users (email, password, avatar, thumbnail) values ($1, $2, $3, $4)';
    await query(
      queryString,
      [email, password, avatarFileName, thumbnailFileName]
    );

    user = await this.findByEmail(email);
    return user;
  }
};

module.exports = User;




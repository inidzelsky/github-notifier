'use strict';

const path = require('path');
const query = require(path.join(__dirname, '..', 'database', 'dbController'));

class User {
  constructor(email, password, avatarFileName, thumbnailFileName) {
    this.email = email;
    this.password = password;
    this.avatarFileName = avatarFileName;
    this.thumbnailFileName = thumbnailFileName;
  }

  async save() {
    // Check if user is already in db
    let user = await User.findByEmail(this.email);
    if (user) {
      const e = new Error();
      e.status = 400;
      e.message = 'User already exists';

      throw e;
    }

    // Insert a new user into db
    const queryString = 'insert into users (email, password, avatar, thumbnail) values ($1, $2, $3, $4)';
    await query(
      queryString,
      [this.email, this.password, this.avatarFileName, this.thumbnailFileName]
    );

    user = await User.findByEmail(this.email);
    return user;
  }

  static async findByEmail(email) {
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
  }
}

module.exports = User;



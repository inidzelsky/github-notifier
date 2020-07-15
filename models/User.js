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
    await query(
      // eslint-disable-next-line max-len
      'insert into users (email, password, avatar, thumbnail) values ($1, $2, $3, $4)',
      [this.email, this.password, this.avatarFileName, this.thumbnailFileName]
    );

    const res = await query('select id from users where email=$1', [this.email]);
    return res.rows[0].id;
  }

  static getAll() {
    console.log(users);
  }
}

module.exports = User;




'use strict';

const users = [];

class User {
  constructor(email, password, avatarFileName, thumbnailFileName) {
    this.email = email;
    this.password = password;
    this.avatarFileName = avatarFileName;
    this.thumbnailFileName = thumbnailFileName;
  }

  save() {
    users.push(this);
  }

  static getAll() {
    console.log(users);
  }
}

module.exports = User;




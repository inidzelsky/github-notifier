'use strict';

const path = require('path');

module.exports = {
  githubToken: '0b1ee702dceafc3a0926314a83729abb2ebb5839',
  connectionString: 'postgresql://obismarck@localhost:5432/notifier',
  jwtSecret: 'jwtSecret',
  avatarsPath: 'public/avatars',
  thumbnailsPath: 'public/avatars/thumbnails',
  multerStorage: {
    destination: (req, file, cb) => cb(null, 'public/avatars'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = Date.now() + ext;
      cb(null, name);
    }
  },
};

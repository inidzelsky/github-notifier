'use strict';

const path = require('path');

module.exports = {
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

'use strict';

const path = require('path');

module.exports = {
  githubToken: process.env.GITHUBTOKEN,
  openWeatherKey: process.env.OPENWEATHERKEY,
  connectionString: process.env.CONNECTIONSTRING,
  jwtSecret: process.env.JWTSECRET,
  avatarsPath: 'avatars',
  thumbnailsPath: 'avatars/thumbnails',
  multerStorage: {
    destination: (req, file, cb) => cb(null, 'public/avatars'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = Date.now() + ext;
      cb(null, name);
    }
  },
  transporterOptions: {
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS
    }
  },
};

'use strict';

const path = require('path');

module.exports = {
  githubToken: process.env.GITHUBTOKEN, 
  openWeatherKey: process.env.OPENWEATHERKEY, //'54191dab2f2f01f8c1db82baf2db5f78'
  connectionString: process.env.CONNECTIONSTRING, //'postgresql://obismarck@localhost:5432/notifier'
  jwtSecret: process.env.JWTSECRET, //'jwtSecret'
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

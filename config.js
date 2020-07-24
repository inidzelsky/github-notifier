'use strict';

const path = require('path');

module.exports = {
  githubToken: 'YOUR GITHUB TOKEN',
  openWeatherKey: 'YOUR OPENWEATHER KEY',
  connectionString: 'YOUR POSTGRE CONNECTION STRING',
  jwtSecret: 'YOUR JWT SECRET',
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
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'YOUR USER',
      pass: 'YOUR PASS'
    }
  },
};

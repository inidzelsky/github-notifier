'use strict';

const path = require('path');

module.exports = {
  githubToken: '4159d673204e5a522c46dc331cf5837486b642ab',
  openWeatherKey: '54191dab2f2f01f8c1db82baf2db5f78',
  googleClientId: '226531308134-jk58mm3sli9077rl8usrcjlu8jp0retb.apps.googleusercontent.com',
  googleClientSecret: 'epPtmgKyZS98FJ7U_ac-YNpZ',
  googleAccessToken: 'ya29.a0AfH6SMB8wLjNOr8okDQ-61wsEc1IVVugOk9OqzvR6Smif3zph-JwcHOUeivLDm1IXLJQv8FcXtFh7ve74sFJgTsGbwVJ1GmQEl_DLfkgkHxh0tW8CWB-vP3LVDunTPHCs_nSiUxo03dJIFtfYO_8jPKq7Trs0k51Dic',
  googleRefreshToken: '1//04awYWD9t7m93CgYIARAAGAQSNwF-L9IrzRVeb1JwjCjc5F25Chqv4K4Ozi8Z_j4aM5gWoNmZa7TWdTL4C5nTaNt3aQWoBuG5dSI',
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
  }
};

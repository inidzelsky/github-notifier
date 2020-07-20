'use strict';

const path = require('path');
const axios = require('axios');

const { oAuthToken } = require(path.join(__dirname, '..', 'config'));

const sendEmails = async ctx => {
  const { userNames } = ctx.request.body;

  const results = await Promise.all(users.map(getUserInfo));
  const users = results.map(res => ({
    email: res.data.email,
    location: res.data.location
  }));

  ctx.body = users;
};

const getUserInfo = (username) => {
  const config = {
    headers: {
      Authorization: `token ${oAuthToken}`
    }
  };

  return axios.get(`https://api.github.com/users/${username}`, config);
};

module.exports = {
  sendEmails
};
'use strict';
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');

// Get config values
const config = require(path.join(__dirname, '..', 'config'));
const { githubToken, openWeatherKey, transporterOptions } = config;

// Get validator
const validate = require(path.join(__dirname, '..', 'validators', 'send'));

const sendController = async ctx => {
  const { usernames, text } = ctx.request.body;

  // Request data validation
  validate({ text, usernames }, ctx);

  // Fetch github email and location data by nickname
  let users = await Promise.all(usernames.map(u => getUserInfo(ctx, u)));

  //Create user objects with the weather data
  users = await Promise.all(users.map(async user => {
    const { login, email, location } = user.data;

    let weather = null;
    if (email && location) {
      const response = await getWeather(location);
      weather = response ? response.weather : null;
    }

    return {
      login,
      email,
      location,
      weather
    };
  }));

  // Set transporter options
  const transporter = nodemailer.createTransport(transporterOptions);

  // Send emails and get the reports
  const result = await Promise.all(users.map(user => sendEmail(transporter, user, text)));

  // Return the sending reports
  ctx.body = {
    result
  };
};

// Function for email sending
const sendEmail = async (transporter, user, text) => {
  let res = {
    username: user.login
  };

  if (!user.email) {
    res.msg = `Not sent. Email is absent`;
    return res;
  }

  let message = text;
  if (user.weather) {
    message += `\n\nThe weather in ${user.location} : ${user.weather[0].main}.`;
  }

  const info = await transporter.sendMail({
    from: 'github.notifier0@gmail.com',
    to: user.email,
    subject: "Notifying",
    text: message
  });

  if (info.rejected.length) {
    res.msg = `Not sent. Error occured`;
  } else {
    res.msg = (message === text) ? 'Sent without weather info' : 'Sent with full info';
  }

  return res;
}

// Function for fetching github user data
const getUserInfo = async (ctx, username) => {
  try {
    const config = {
      headers: {
        Authorization: `token ${githubToken}`
      }
    };

    const url = `https://api.github.com/users/${username}`;
    const res = await axios.get(url, config);
    return res;
  } catch(e) {
    if (e.response && e.response.status === 404)
      ctx.throw(404, `User "${username} was not found"`);

    throw e;
  }
};

// Function for getting the weather by location
const getWeather = async city => {
  if (!city)
    return null;

  const config = {
    params: {
      q: city,
      appid: openWeatherKey
    }
  };

  try {
    const res = await axios.get('http://api.openweathermap.org/data/2.5/weather', config);
    return res.data;
  } catch(e) {
    if (e.response.status !== 404)
      throw e;
  }
}

module.exports = {
  sendController
};
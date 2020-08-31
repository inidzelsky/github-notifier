'use strict';
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');

// Get config values
const { githubToken, openWeatherKey, transporterOptions } = require(path.join(__dirname, '..', 'config'));

// Get validator
const validate = require(path.join(__dirname, '..', 'validators', 'send'));

const sendController = async ctx => {
  const { usernames, text } = ctx.request.body;

  // Request data validation
  validate({ text, usernames }, ctx);

  // Fetch github email and location data by username
  let users = await Promise.all(usernames.map(u => getUserInfo(u, ctx)));

  //Create user objects with the weather data
  users = await Promise.all(users.map(u => shapeData(u)));

  // Set transporter options
  const transporter = nodemailer.createTransport(transporterOptions);

  // Send emails and get the reports
  const result = await Promise.all(users.map(user => sendEmail(transporter, user, text)));

  // Return the sending reports
  ctx.body = {
    result
  };
};

const shapeData = async user => {
  const { login, email, location } = user.data;

  let weather;
  if (email && location) {
    const response = await getWeather(location);
    weather = response ? response.weather : undefined;
  }

  return {
    login,
    email,
    location,
    weather
  };
};

// Function for email sending
const sendEmail = async (transporter, user, textMsg) => {
  // Initial res object
  let res = {
    username: user.login
  };

  if (!user.email) {
    res.msg = `Not sent. Email is absent`;
    return res;
  }

  // Form user message
  let weatherMsg;
  if (user.weather)
    weatherMsg = `\n\nThe weather in ${user.location} : ${user.weather[0].main}.`;

  const fullMsg = textMsg + weatherMsg;

  const info = await transporter.sendMail({
    from: 'github.notifier0@gmail.com',
    to: user.email,
    subject: "Notifying",
    text: fullMsg
  });

  if (info.rejected.length) {
    res.msg = `Not sent. Error occured`;
  } else {
    res.msg = weatherMsg ? 'Sent with full info' : 'Sent without weather info';
  }

  return res;
};

// Function for fetching github user data
const getUserInfo = async (username, ctx) => {
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
    if (e.response.status === 404)
      ctx.throw(404, `User "${username} was not found"`);

    throw e;
  }
};

// Function for getting the weather by location
const getWeather = async city => {
  if (!city)
    return;

  const config = {
    params: {
      q: city,
      appid: openWeatherKey
    }
  };

  try {
    const { data } = await axios.get('http://api.openweathermap.org/data/2.5/weather', config);
    return data;
  } catch(e) {
    if (e.response.status !== 404)
      throw e;
  }
}

module.exports = {
  sendController
};
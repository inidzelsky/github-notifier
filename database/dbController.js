'use strict';

const path = require('path');
const { Client } = require('pg');

const { connectionString } = require(path.join(__dirname, '..', 'config'));

const client = new Client({
  connectionString
});

client.connect();

const query = (text, params) => client.query(text, params);

module.exports = query;


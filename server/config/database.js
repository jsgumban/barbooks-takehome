const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: process.env.DB_PATH || './data.db'
  },
  useNullAsDefault: true
});

module.exports = db;
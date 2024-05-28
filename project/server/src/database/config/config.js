const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_NAME;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DIALECT = process.env.DB_DIALECT;

module.exports = {
  "development": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "port": PORT,
    "dialect": DIALECT
  },
  "test": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "port": PORT,
    "dialect": DIALECT
  },
  "production": {
    "username": USERNAME,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "port": PORT,
    "dialect": DIALECT
  }
}

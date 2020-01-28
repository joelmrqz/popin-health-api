const { Sequelize, DataTypes, Model } = require('sequelize');

const database = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres',
});

module.exports = {
  dbconn: database,
  Database: Sequelize,
  DataTypes,
  Model,
};

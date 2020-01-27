const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize('HOST', {
  database: 'DATABASE',
  username: 'USERNAME',
  password: 'PASSWORD',
  dialect: 'postgres',
});

module.exports = {
  database,
  types: DataTypes,
};

const { database, types } = require('../commons/database');

const Location = database.define('Location', {
  type: {
    type: types.STRING,
  },
  label: {
    type: types.STRING,
  },
  geo: {
    type: types.ARRAY(types.STRING),
  }
});

module.exports = Location;

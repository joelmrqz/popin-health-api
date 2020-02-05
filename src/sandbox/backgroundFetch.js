const response = require('../commons/response');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  const timestamp = new Date();
  console.log('BACKGROUND_FETCH_TIMESTAMP_UTC:', timestamp.toUTCString());
  return response.buildSuccess({
    message: 'success',
  });
};

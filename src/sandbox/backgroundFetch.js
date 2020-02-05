const response = require('../commons/response');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  console.log('BACKGROUND_FETCH:', Date.now());
  return response.buildSuccess({
    message: 'success',
  });
};

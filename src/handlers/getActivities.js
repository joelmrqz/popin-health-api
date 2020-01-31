const response = require('../commons/response');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    return response.buildSuccess({
      id: 123,
      startTime: '2020-01-16T19:19:30Z',
      endTime: '2020-01-16T20:19:30Z',
      duration: 60,
      type: 'Running',
    });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.buildError(500);
  }
};

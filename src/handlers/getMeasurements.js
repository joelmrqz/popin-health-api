const response = require('../commons/response');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    const query = event.queryStringParameters;
    console.log('QUERY:', query);

    return response.buildSuccess([
      {
        id: 123,
        dateTime: '2020-01-16T19:19:30Z',
        type: 'Heart Rate',
      },
    ]);
  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.buildError(500);
  }
};

const response = require('../commons/response');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    return response.buildSuccess({
      id: 123,
      dateTime: '2020-01-16T19:19:30Z',
      type: 'Heart Rate',
      metricLabel: 'Heartbeat',
      metricValue: '60',
      reporter: {
        id: 123,
        label: 'Apple Watch',
        selfReported: false,
      },
    });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.buildError(500);
  }
};

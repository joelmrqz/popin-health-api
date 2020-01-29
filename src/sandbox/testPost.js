const response = require('../commons/response');
const health = require('../commons/health');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    const params = JSON.parse(event.body);
    const result = health.buildMeasurements(params);
    return response.buildSuccess(result);
  } catch (error) {
    console.error('ERROR:', error);
    return response.buildError(500);
  }
};

const response = require('../commons/response');
const health = require('../commons/health');
const User = require('../models/User');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    const params = event.pathParameters;
    console.log('PARAMS:', params);

    if (!params  || !params.userProfile) {
      return response.buildError(401);
    }

    const user = await User.findByPk(params.userProfile);
    console.log('USER:', user);

    if (!user) {
      return response.buildError(401);
    }

    const body = JSON.parse(event.body);

    if (!body) {
      return response.buildError(400);
    }

    const result = health.buildMeasurements(body);

    // TODO:
    // Implement insert for the
    // built measurements.

    return response.buildSuccess(result, 201);
  } catch (error) {
    console.error('ERROR:', error);
    return response.buildError(500);
  }
};

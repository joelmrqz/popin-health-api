const authenticate = require('../commons/authenticate');
const response = require('../commons/response');
const health = require('../commons/health');
const CustomerProvider = require('../models/CustomerProvider');
const Measurement = require('../models/Measurement');
const MeasurementType = require('../models/MeasurementType');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    // Validate `userProfile` parameter.
    const user = await authenticate.userProfile(event.pathParameters);

    if (!user) {
      return response.buildError(401);
    }

    // TODO:
    // Perform a more detailed
    // payload validation.
    const body = JSON.parse(event.body);

    // Check if the request body is empty.
    if (!body) {
      return response.buildError(400);
    }

    // Get the `providerId` associated with the user profile.
    const customerProvider = await CustomerProvider.findOne({
      where: { customerId: user.customerId },
    });

    if (!customerProvider) {
      return response.buildError(400);
    }

    // Get measurement type for `height`.
    const heightMeasurementType = await MeasurementType.findOne({
      where: { measurementTypeName: 'height' },
    });

    // Get measurement type for `weight`.
    const weightMeasurementType = await MeasurementType.findOne({
      where: { measurementTypeName: 'weight' },
    });

    // Get last inserted id of `measurements` table.
    let lastInsertedId = 0;
    const latestMeasurement = await Measurement.findOne({
      where: {},
      order: [['id', 'DESC']],
    });

    if (latestMeasurement) {
      lastInsertedId = latestMeasurement.id;
    }

    // Build options object for building
    // the measurement objects.
    const options = {
      userId: user.id,
      providerId: customerProvider.providerId,
      measurementId: lastInsertedId,
      heightMeasurementType,
      weightMeasurementType,
    };

    // Build mesurement objects for db insert.
    const measurements = health.buildMeasurements(body, options);

    // Implement insert for the
    // built measurements.
    await Measurement.bulkCreate(measurements);
    return response.buildSuccess({ message: 'success' }, 201);
  } catch (error) {
    console.error('ERROR:', error);
    return response.buildError(500);
  }
};

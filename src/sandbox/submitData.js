const response = require('../commons/response');
const health = require('../commons/health');
const User = require('../models/User');
const CustomerProvider = require('../models/CustomerProvider');
const Measurement = require('../models/Measurement');
const MeasurementType = require('../models/MeasurementType');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    // Get path parameters.
    const params = event.pathParameters;
    console.log('PARAMS:', params);

    // Check the presence of `userProfile` param.
    if (!params  || !params.userProfile) {
      return response.buildError(401);
    }

    const user = await User.findByPk(params.userProfile);
    console.log('USER:', user);

    // Check if the user exists on the database.
    if (!user) {
      return response.buildError(401);
    }

    const body = JSON.parse(event.body);
    console.log('BODY:', body);

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

    console.log('CUSTOMER_PROVIDER:', customerProvider);

    // Get measurement type for `height`.
    const heightMeasurementType = await MeasurementType.findOne({
      where: { measurementTypeName: 'height' },
    });

    // Get measurement type for `weight`.
    const weightMeasurementType = await MeasurementType.findOne({
      where: { measurementTypeName: 'weight' },
    });

    // Get last inserted id of `measurements` table.
    const latestMeasurement = await Measurement.findOne({
      order: [['id', 'DESC']],
    });

    const lastInsertedId = latestMeasurement.id;

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

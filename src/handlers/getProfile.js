const authenticate = require('../commons/authenticate');
const response = require('../commons/response');
const health = require('../commons/health');
const Measurement = require('../models/Measurement');
const MeasurementType = require('../models/MeasurementType');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    const data = {};

    // Validate `userProfile` parameter.
    const user = await authenticate.userProfile(event.pathParameters);
    if (!user) { return response.buildError(401); }

    // Get measurement type for `height`.
    const heightMeasurementType = await MeasurementType.findOne({
      where: { measurementTypeName: 'height' },
    });

    // Get measurement type for `weight`.
    const weightMeasurementType = await MeasurementType.findOne({
      where: { measurementTypeName: 'weight' },
    });

    // Query for the latest height measurement.
    const heightMeasurement = await Measurement.findOne({
      where: { userId: user.id, measurementTypeId: heightMeasurementType.id },
      order: [['createdAt', 'DESC']],
    });

    if (heightMeasurement) {
      data.height = parseInt(heightMeasurement.measurementValue, 10);
    }

    // Query for the latest weight measurement.
    const weightMeasurement = await Measurement.findOne({
      where: { userId: user.id, measurementTypeId: weightMeasurementType.id },
      order: [['createdAt', 'DESC']],
    });

    if (weightMeasurement) {
      data.weight = parseInt(weightMeasurement.measurementValue, 10);
    }

    // Compute for the BMI.
    if (data.height && data.weight) {
      data.bmi = health.computeBMI({ height: data.height, weight: data.weight });
    }

    return response.buildSuccess(data);
  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.buildError(500);
  }
};

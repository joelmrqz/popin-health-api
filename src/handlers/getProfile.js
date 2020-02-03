const response = require('../commons/response');
const health = require('../commons/health');
const Measurement = require('../models/Measurement');
const MeasurementType = require('../models/MeasurementType');
const User = require('../models/User');

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

    // Get measurement type for `height`.
    const heightMeasurementType = await MeasurementType.findOne({
      where: {
        measurementTypeName: 'height',
      },
    });

    // Get measurement type for `weight`.
    const weightMeasurementType = await MeasurementType.findOne({
      where: {
        measurementTypeName: 'weight',
      },
    });

    // Query for the latest height measurement.
    const heightMeasurement = await Measurement.findOne({
      where: {
        measurementTypeId: heightMeasurementType.id,
      },
      order: [['createdAt', 'DESC']],
    });


    // Query for the latest weight measurement.
    const weightMeasurement = await Measurement.findOne({
      where: {
        measurementTypeId: weightMeasurementType.id,
      },
      order: [['createdAt', 'DESC']],
    });

    const data = {
      height: heightMeasurement.measurementValue,
      weight: weightMeasurement.measurementValue,
      bmi: health.computeBMI({
        height: heightMeasurement.measurementValue,
        weight: weightMeasurement.measurementValue,
      }),
    };

    return response.buildSuccess(data);
  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.buildError(500);
  }
};

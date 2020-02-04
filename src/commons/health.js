const moment = require('moment');

const health = {
  buildMeasurements: (params, options) => {
    let id = options.measurementId;
    const period = 90;
    const measurements = [];

    // Create a measurement object
    // for `height` measurement type.
    // ------------------------
    measurements.push({
      id: ++id,
      measurementTypeId: options.heightMeasurementType.id,
      measurementLabel: 'Height',
      measurementValue: params.height,
      userId: options.userId,
      providerId: options.providerId,
      selfProvided: options.selfProvided || false,
      createdAt: moment.utc(),
    });

    // Create measurement object(s)
    // for `weight` depending on the
    // number of `weight frequency`.
    // ------------------------
    const frequency = parseInt(params.weightFrequency, 10);

    // Exactly 1 weight frequency
    if (frequency === 1) {
      measurements.push({
        id: ++id,
        measurementTypeId: options.weightMeasurementType.id,
        measurementLabel: 'Weight',
        measurementValue: params.weight,
        userId: options.userId,
        providerId: options.providerId,
        selfProvided: options.selfProvided || false,
        createdAt: moment.utc(),
      });
    }

    // Greater than 1 weight frequency
    if (frequency > 1) {
      const dateDelta = Math.floor(period / frequency);

      for (let i = (frequency - 1); i >= 0; i -= 1) {
        const weight = (params.weight - (params.weightVariance * i));
        measurements.push({
          id: ++id,
          measurementTypeId: options.weightMeasurementType.id,
          measurementLabel: 'Weight',
          measurementValue: weight,
          userId: options.userId,
          providerId: options.providerId,
          selfProvided: options.selfProvided || false,
          createdAt: moment.utc(moment().subtract((dateDelta * i), 'day')),
        });
      }
    }

    return measurements;
  },

  computeBMI: (params) => {
    // Assumes that the height is in
    // inches and weight is in pounds.
    const opA = 703 * params.weight;
    const opB = params.height * params.height;
    const bmi = opA / opB;
    return parseFloat(bmi.toFixed(2));
  },
};

module.exports = health;

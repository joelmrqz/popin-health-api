const moment = require('moment');

const health = {
  buildMeasurements: (params) => {
    let id = 0;
    const period = 90;
    const measurements = { height: [], weight: [] };

    // Create a measurement object
    // for `height` measurement type.
    // ------------------------
    measurements.height.push({
      id: ++id,
      measurementTypeId: 1,
      measurementLabel: 'Height',
      measurementValue: params.height,
      userId: 123,
      providerId: 123,
      selfReported: false,
      createdAt: moment.utc(moment().subtract(period, 'day')),
    });


    // Create measurement object(s)
    // for `weight` depending on the
    // number of `weight frequency`.
    // ------------------------
    const frequency = parseInt(params.weightFrequency, 10);


    // Exactly 1 weight frequency
    if (frequency === 1) {
      measurements.weight.push({
        id: ++id,
        measurementTypeId: 2,
        measurementLabel: 'Weight',
        measurementValue: params.weight,
        userId: 123,
        providerId: 123,
        selfReported: false,
        createdAt: moment.utc(moment().subtract(period, 'day')),
      });
    }

    // Greater than 1 weight frequency
    if (frequency > 1) {
      const dateDelta = Math.floor(period / frequency);

      for (let i = (frequency - 1); i >= 0; i -= 1) {
        const weight = (params.weight - (params.weightVariance * i));
        measurements.weight.push({
          id: ++id,
          measurementTypeId: 2,
          measurementLabel: 'Weight',
          measurementValue: weight,
          userId: 123,
          providerId: 123,
          selfReported: false,
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
    return bmi;
  },
};

module.exports = health;

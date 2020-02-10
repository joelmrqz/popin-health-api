const moment = require('moment');

const BODY_PERIOD_DAYS = 90;
const HR_FREQUENCY_HRS = 24;
const HR_FREQUENCY_MNS = 1440;
const HR_FREQUENCY_LIMIT = 8640;

const health = {
  buildBodyMeasurements: (params, options) => {
    const bodyMeasurements = [];
    const height = parseInt(params.height, 10);
    const weight = parseInt(params.weight, 10);
    const frequency = parseInt(params.weightFrequency);
    const variance = parseFloat(params.weightVariance);

    // Create a measurement object
    // for `height` measurement type.
    // ------------------------
    bodyMeasurements.push({
      id: ++options.measurementId,
      measurementTypeId: options.heightMeasurementType.id,
      measurementLabel: 'Height',
      measurementValue: height,
      userId: options.userId,
      providerId: options.providerId,
      selfProvided: options.selfProvided || false,
      createdAt: moment.utc().toISOString(),
    });

    // Create measurement object(s)
    // for `weight` depending on the
    // number of `weight frequency`.
    // ------------------------

    // Exactly 1 weight frequency
    if (frequency === 1) {
      bodyMeasurements.push({
        id: ++options.measurementId,
        measurementTypeId: options.weightMeasurementType.id,
        measurementLabel: 'Weight',
        measurementValue: weight,
        userId: options.userId,
        providerId: options.providerId,
        selfProvided: options.selfProvided || false,
        createdAt: moment.utc().toISOString(),
      });
    }

    // Greater than 1 weight frequency
    if (frequency > 1) {
      const interval = Math.floor(BODY_PERIOD_DAYS / frequency);

      for (let i = (frequency - 1); i >= 0; i -= 1) {
        const computedWeight = (weight - (variance * i));

        bodyMeasurements.push({
          id: ++options.measurementId,
          measurementTypeId: options.weightMeasurementType.id,
          measurementLabel: 'Weight',
          measurementValue: computedWeight,
          userId: options.userId,
          providerId: options.providerId,
          selfProvided: options.selfProvided || false,
          createdAt: moment.utc().subtract((interval * i), 'day').toISOString(),
        });
      }
    }

    return bodyMeasurements;
  },

  buildHeartRateMeasurements: (params, options) => {
    const heartRateMeasurements = [];
    const heartRate = parseInt(params.hr, 10);
    const frequency = parseInt(params.hrFrequency, 10);
    const variance = parseFloat(params.hrVariance);

    if (frequency <= HR_FREQUENCY_LIMIT) {
      let intervalMode = 'hour';
      let intervalValue = parseFloat((HR_FREQUENCY_HRS / frequency).toFixed(2));

      if (frequency > HR_FREQUENCY_HRS && frequency <= HR_FREQUENCY_MNS) {
        intervalMode = 'minute';
        intervalValue = parseFloat(((HR_FREQUENCY_HRS / frequency) * 60).toFixed(2));
      }

      if (frequency > HR_FREQUENCY_MNS) {
        intervalMode = 'second';
        intervalValue = parseFloat(((HR_FREQUENCY_HRS / frequency) * 60 * 60).toFixed(2));
      }

      for (let i = (frequency - 1); i >= 0; i -= 1) {
        const computedHeartRate = (heartRate - (variance * i));
        console.log(` HR_DATE: ${moment.utc().startOf('day').add((intervalValue * i), intervalMode).toISOString()} - HR_VALUE: ${computedHeartRate}`);

        heartRateMeasurements.push({
          id: ++options.measurementId,
          measurementTypeId: 3,
          measurementLabel: 'Heart Rate',
          measurementValue: parseInt(computedHeartRate.toFixed(0), 10),
          userId: options.userId,
          providerId: options.providerId,
          selfProvided: options.selfProvided || false,
          createdAt: moment.utc().startOf('day').add((intervalValue * i), intervalMode).toISOString(),
        });
      }
    }

    console.log('HEART_RATE_MEASUREMENT_COUNT:', heartRateMeasurements.length);
    return heartRateMeasurements;
  },

  buildBloodPressureMeasurements: (params, options) => {
    const bloodPressureMeasurements = [];

    bloodPressureMeasurements.push({
      id: ++options.measurementId,
      measurementTypeId: 4,
      measurementLabel: 'BP Systolic',
      measurementValue: 0,
      userId: options.userId,
      providerId: options.providerId,
      selfProvided: options.selfProvided || false,
      createdAt: moment.utc().toISOString(),
    });

    bloodPressureMeasurements.push({
      id: ++options.measurementId,
      measurementTypeId: 4,
      measurementLabel: 'BP Diastolic',
      measurementValue: 0,
      userId: options.userId,
      providerId: options.providerId,
      selfProvided: options.selfProvided || false,
      createdAt: moment.utc().toISOString(),
    });

    return bloodPressureMeasurements;
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

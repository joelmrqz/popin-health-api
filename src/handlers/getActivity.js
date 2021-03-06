const response = require('../commons/response');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    return response.buildSuccess({
      id: 123,
      startTime: '2020-01-16T19:19:30Z',
      endTime: '2020-01-16T20:19:30Z',
      duration: 60,
      type: 'Running',
      label: 'Treadmill',
      startLocation: {
        type: 'Fitness Facility',
        label: 'Equinox Wall Street',
        geo: ['40.7076193', '-74.0127835'],
      },
      segmentLocations: [{
        type: 'Fitness Facility',
        label: 'Equinox Wall Street',
        geo: ['40.7076193', '-74.0127835'],
      }],
      endLocation: {
        type: 'Fitness Facility',
        label: 'Equinox Wall Street',
        geo: ['40.7076193', '-74.0127835'],
      },
      reporter: [{
        id: 123,
        label: 'Apple Watch',
        selfReported: false,
      }],
      metric: {
        avgHr: 72,
        maxHr: 122,
        minHr: 64,
        steps: 4650,
        distance: 11088,
        flights: 3,
        activeCal: 423,
        basalCal: 1446,
      },
    });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.buildError(500);
  }
};

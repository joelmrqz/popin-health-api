const router = require('express').Router();

const measurement = {
  id: 123,
  dateTime: '2020-01-16T19:19:30Z',
  type: 'Heart Rate',
  metricLabel: 'Heartbeat',
  metricValue: '60',
  reporter: {
    id: 123,
    label: 'Apple Watch',
    selfReported: false,
  },
};

router.get('/', (request, response) => {
  try {
    response.status(200).json([measurement]).end();
  } catch (error) {
    response.status(500).json({ message: 'Server Error' }).end();
  }
});

router.get('/:measurementId', (request, response) => {
  try {
    response.status(200).json(measurement).end();
  } catch (error) {
    response.status(500).json({ message: 'Server Error' }).end();
  }
});


module.exports = router;

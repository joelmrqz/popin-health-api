const serverless = require('serverless-http');
const express = require('express');
const parser = require("body-parser");
const accessControl = require('./middlewares/access-control');

const server = express();
server.use(parser.urlencoded({ extended: true }));
server.use(parser.json());
server.all('*', accessControl);

server.get('/:userProfile/activities/:activityId', (request, response) => {
  response.status(200).json({
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
    params: {
      userProfile: request.params.userProfile,
      activityId: request.params.activityId,
    },
  }).end();
});

server.get('/:userProfile/profile', (request, response) => {
  response.status(200).json({
    age: 10950,
    weight: 120,
    height: 70,
    bodyFat: 200,
    bmi: 100,
    params: {
      userProfile: request.params.userProfile,
    },
  }).end();
});

server.get('/', (request, response) => {
  response.status(200).json({ message: 'success' }).end();
});

const handler = serverless(server);

exports.handler = async (event, context) => {
  return await handler(event, context);
};

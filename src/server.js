const express = require('express');
const parser = require('body-parser');

const accessControl = require('./middlewares/access-control');
const noRoute = require('./middlewares/no-route');
const validateToken = require('./middlewares/validate-token');

const profileController = require('./controllers/profile');
const activitiesController = require('./controllers/activities');
const measurementsController = require('./controllers/measurements');

const server = express();
server.use(parser.urlencoded({ extended: true }));
server.use(parser.json());
server.all('*', accessControl);

server.use('/:userProfile/profile', validateToken, profileController);
server.use('/:userProfile/activities', validateToken, activitiesController);
server.use('/:userProfile/measurements', validateToken, measurementsController);

server.use(noRoute);
module.exports = server;

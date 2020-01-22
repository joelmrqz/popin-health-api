const serverless = require('serverless-http');
const server = require('./server');

const handler = serverless(server);

exports.server = async (event, context) => {
  return await handler(event, context);
};
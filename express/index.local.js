const express = require('express');
const parser = require("body-parser");
const accessControl = require('./middlewares/access-control');

const server = express();
server.use(parser.urlencoded({ extended: true }));
server.use(parser.json());
server.all('*', accessControl);

server.get('/', (request, response) => {
  response.status(200).json({ message: 'success' }).end();
});

server.listen(5000, () => {
  console.log('Server @ :5000');
});

const noRoute = (request, response, next) => {
  response.status(404).json({ message: 'Not Found' }).end();
};

module.exports = noRoute;

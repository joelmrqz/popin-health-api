const validateToken = (request, response, next) => {
  console.log('REQUEST PARAMS:', request.params);
  next();
};

module.exports = validateToken;
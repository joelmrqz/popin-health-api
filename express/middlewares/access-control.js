const accessControl = (request, response, next) => {
  response.append('Access-Control-Allow-Origin', '*' );
  response.append('Access-Control-Allow-Methods', '*');
  response.append('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS') {
    response.status(200).json({}).end();
    return;
  }

  next();
};

module.exports = accessControl;

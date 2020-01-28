const headers = { 'Content-Type': 'application/json' };

const response = {
  buildSuccess: (data = {}, statusCode = 200) => {
    const body = JSON.stringify(data);
    const response = { statusCode, body, headers };
    return response;
  },

  buildError: (statusCode = 500) => {
    const messages = {
      '500': 'Internal Server Error',
      '404': 'Resource Not Found',
      '403': 'Forbidden',
      '401': 'Unauthorized',
      '400': 'Bad Request',
    };

    const body = JSON.stringify({ message: messages[statusCode.toString()] });
    const response = { statusCode, body, headers };
    return response
  },
};

module.exports = response;

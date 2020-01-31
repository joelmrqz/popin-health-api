const response = require('../commons/response');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    return response.buildSuccess({
      age: 10950,
      weight: 120,
      height: 70,
      bodyFat: 200,
      bmi: 100,
    });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return response.buildError(500);
  }
};

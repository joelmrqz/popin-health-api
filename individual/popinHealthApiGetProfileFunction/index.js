const buildResponse = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  try {
    const params = event['pathParameters'];

    if (!params || !params.userProfile) {
      return buildResponse(401, { message: 'Unauthorized' });
    }

    return buildResponse(200, {
      age: 10950,
      weight: 120,
      height: 70,
      bodyFat: 200,
      bmi: 100,
    });
  } catch (error) {
    return buildResponse(500, { message: error.toString() });
  }
};

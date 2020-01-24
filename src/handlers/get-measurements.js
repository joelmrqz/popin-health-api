exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    header: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'GET_MEASUREMENTS' }),
  };
};

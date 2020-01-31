// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (error) {
    console.error('ERROR:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

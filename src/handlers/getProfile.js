module.exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        age: 10950,
        weight: 120,
        height: 70,
        bodyFat: 200,
        bmi: 100,
      }),
    };
  } catch (error) {
    console.error('Internal Server Error:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

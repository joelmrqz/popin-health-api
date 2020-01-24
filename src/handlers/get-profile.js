exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      age: 10950,
      weight: 120,
      height: 70,
      bodyFat: 200,
      bmi: 100,
    }),
  };
};

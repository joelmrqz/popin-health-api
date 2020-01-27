exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

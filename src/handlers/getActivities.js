exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          id: 123,
          startTime: '2020-01-16T19:19:30Z',
          endTime: '2020-01-16T20:19:30Z',
          duration: 60,
          type: 'Running',
        },
      ]),
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

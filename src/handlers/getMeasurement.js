exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 123,
      dateTime: '2020-01-16T19:19:30Z',
      type: 'Heart Rate',
      metricLabel: 'Heartbeat',
      metricValue: '60',
      reporter: {
        id: 123,
        label: 'Apple Watch',
        selfReported: false,
      },
    }),
  };
};

// TEMP BLOCK
// Enable this when there are
// changes in the model definition.
// const Client = require('../models/Client');
// const Customer = require('../models/Customer');
// const CustomerProvider = require('../models/CustomerProvider');
// const Measurement = require('../models/Measurement');
// const MeasurementType = require('../models/MeasurementType');
// const Provider = require('../models/Provider');
// const ProviderType = require('../models/ProviderType');


module.exports.handler = async (event, context) => {
  try {
    // TEMP BLOCK
    // Enable this when there are
    // changes in the model definition.
    // await MeasurementType.sync();
    // await ProviderType.sync();
    // await CustomerProvider.sync();
    // await Client.sync();
    // await Customer.sync();
    // await Measurement.sync();
    // await Provider.sync();

    // Check request body presence,
    // otherwise, return 400 (bad request).
    if (!event.body || !Object.keys(event.body).length) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Bad Request' }),
      };
    }

    const params = JSON.parse(event.body);
    console.log('PARAMS:', params);

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

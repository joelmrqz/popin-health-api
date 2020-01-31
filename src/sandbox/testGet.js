// const Customer = require('../models/Customer');
// const User = require('../models/User');
// const ProviderType = require('../models/ProviderType');
// const Provider = require('../models/Provider');

// eslint-disable-next-line no-unused-vars
module.exports.handler = async (event, context) => {
  try {
    // const result = await Customer.create({
    //   id: 1,
    //   customerName: 'John Smith',
    // });

    // const result = await User.create({
    //   id: 1,
    //   customerId: 1,
    //   terms: true,
    // });

    // const result = await ProviderType.create({
    //   id: 1,
    //   providerTypeName: 'Mobile',
    // });

    // const result = await Provider.create({
    //   id: 1,
    //   providerTypeId: 1,
    //   providerName: 'Apple Health Kit',
    // });

    // console.log('RESULT:', result);

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

const { dbconn, Database, DataTypes, Model } = require('../commons/database');
const Customer = require('./Customer');
const Provider = require('./Provider');

class CustomerProvider extends Model {}
Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: 'id',
        deferrable: Database.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Provider,
        key: 'id',
        deferrable: Database.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    authToken: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'customerProvider',
  }
);

module.exports = Customer;

const { dbconn, Database, DataTypes, Model } = require('../commons/database');
const Customer = require('./Customer');

class Client extends Model {}
Client.init(
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
    terms: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'client',
  }
);

module.exports = Client;

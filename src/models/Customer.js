const { dbconn, DataTypes, Model } = require('../commons/database');

class Customer extends Model {}
Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'customer',
  }
);

module.exports = Customer;

const { dbconn, Database, DataTypes, Model } = require('../commons/database');
const Customer = require('./Customer');

class User extends Model {}
User.init(
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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'user',
    tableName: 'users',
  }
);

module.exports = User;

const { dbconn, Database, DataTypes, Model } = require('../commons/database');
const ProviderType = require('./ProviderType');

class Provider extends Model {}
Provider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    providerTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProviderType,
        key: 'id',
        deferrable: Database.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'provider',
    tableName: 'providers',
  }
);

module.exports = Provider;

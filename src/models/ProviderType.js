const { dbconn, DataTypes, Model } = require('../commons/database');

class ProviderType extends Model {}
ProviderType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    providerTypeName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'providerType',
    tableName: 'providerTypes',
  }
);

module.exports = ProviderType;

const { dbconn, DataTypes, Model } = require('../commons/database');

class ProviderType extends Model {}
ProviderType.init(
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
    modelName: 'providerType',
  }
);

module.exports = ProviderType;

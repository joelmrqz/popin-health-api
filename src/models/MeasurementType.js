const { dbconn, DataTypes, Model } = require('../commons/database');

class MeasurementType extends Model {}
MeasurementType.init(
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
    modelName: 'measurementType',
  }
);

module.exports = MeasurementType;

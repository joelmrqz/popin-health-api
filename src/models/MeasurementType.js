const { dbconn, DataTypes, Model } = require('../commons/database');

class MeasurementType extends Model {}
MeasurementType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    measurementTypeName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'measurementType',
    tableName: 'measurementTypes',
  }
);

module.exports = MeasurementType;

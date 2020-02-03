const { dbconn, Database, DataTypes, Model } = require('../commons/database');
const User = require('./User');
const Provider = require('./Provider');
const MeasurementType = require('./MeasurementType');

class Measurement extends Model {}
Measurement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: Database.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    measurementTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: MeasurementType,
        key: 'id',
        deferrable: Database.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    measurementLabel: {
      type: DataTypes.STRING,
    },
    measurementValue: {
      type: DataTypes.STRING,
    },
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Provider,
        key: 'id',
        deferrable: Database.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    selfProvided: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'measurement',
    tableName: 'measurements',
  }
);

module.exports = Measurement;

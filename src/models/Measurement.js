const { dbconn, Database, DataTypes, Model } = require('../commons/database');
const Client = require('./Client');
const Provider = require('./Provider');
const MeasurementType = require('./MeasurementType');

class Measurement extends Model {}
Measurement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
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
    selfReported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: dbconn,
    modelName: 'measurement',
  }
);

module.exports = Measurement;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tieuchuan_tieuchi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tieuchuan_tieuchi.belongsTo(models.Tieuchi, { foreignKey: 'id_tieuchi' });
      Tieuchuan_tieuchi.belongsTo(models.Tieuchuan, { foreignKey: 'id_tieuchuan' });
      Tieuchuan_tieuchi.belongsTo(models.Version, { foreignKey: 'versionId' });

    }
  }
  Tieuchuan_tieuchi.init({
    id_tieuchuan: DataTypes.INTEGER,
    id_tieuchi: DataTypes.INTEGER,
    versionId: DataTypes.INTEGER,

    

  }, {
    sequelize,
    modelName: 'Tieuchuan_tieuchi',
  });
  return Tieuchuan_tieuchi;
};
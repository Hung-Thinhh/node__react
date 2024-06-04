'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Danhgia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Danhgia.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Danhgia.belongsTo(models.Version, { foreignKey: 'versionId' });

    }
  }
  Danhgia.init({
    userId: DataTypes.INTEGER,
    danhgia: DataTypes.JSON,
    finaldanhgia: DataTypes.JSON,
    versionId: DataTypes.INTEGER,

    

  }, {
    sequelize,
    modelName: 'Danhgia',
  });
  return Danhgia;
};
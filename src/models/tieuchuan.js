'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tieuchuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tieuchuan.belongsToMany(models.Tieuchi, {through: 'Tieuchuan_tieuchi',foreignKey: 'id_tieuchi'})
    }
  }
  Tieuchuan.init({
    name: DataTypes.STRING,
    diem: DataTypes.INTEGER,
     createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'Tieuchuan',
  });
  return Tieuchuan;
};
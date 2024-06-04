'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tieuchi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tieuchi.hasMany(models.User,{foreignKey: 'groupId'})
      Tieuchi.belongsToMany(models.Tieuchuan, {through: 'Tieuchuan_tieuchi',foreignKey: 'id_tieuchuan'})

    }
  }
  Tieuchi.init({
    name: DataTypes.STRING,
    diem: DataTypes.INTEGER,
    

  }, {
    sequelize,
    modelName: 'Tieuchi',
  });
  return Tieuchi;
};
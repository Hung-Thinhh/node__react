'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.belongsTo(models.Group,{foreignKey: 'groupId'})
      User.belongsToMany(models.Project, {through: 'Project_User'})
      User.hasOne(models.Danhgia, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    gender: DataTypes.STRING,
    avt: DataTypes.STRING,
    birthday: DataTypes.DATE,
    home: DataTypes.STRING,
    thongbao: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    active: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
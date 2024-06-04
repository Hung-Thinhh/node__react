"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    static associate(models) {
      Version.hasMany(models.Tieuchuan, { foreignKey: "versionId" });
      Version.hasMany(models.Tieuchuan_tieuchi, { foreignKey: "versionId" });
    }
  }
  Version.init(
    {
      name: DataTypes.STRING,
      total_diem: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Version",
    }
  );
  return Version;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  let house = sequelize.define('house', {
    area: DataTypes.INTEGER,
    basePrice: DataTypes.INTEGER,
    rentPrice: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    dealType: DataTypes.INTEGER,
    expireTime: DataTypes.BIGINT,
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    buildingType: DataTypes.STRING,
    address: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  house.associate = function (models) {
    // associations can be defined here
  };
  return house;
};
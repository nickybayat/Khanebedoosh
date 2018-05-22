'use strict';
module.exports = (sequelize, DataTypes) => {
  let individual = sequelize.define('individual', {
    balance: DataTypes.INTEGER,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {timestamps: false});
  individual.associate = function (models) {
    // individual.hasMany(models.HouseID, { onDelete: 'cascade' });
  };
  return individual;
};
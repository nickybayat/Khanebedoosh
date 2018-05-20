'use strict';
module.exports = (sequelize, DataTypes) => {
    let House = sequelize.define('House', {
        area : DataTypes.INTEGER,
        basePrice: DataTypes.INTEGER,
        rentPrice: DataTypes.INTEGER,
        sellPrice: DataTypes.INTEGER,
        dealType: DataTypes.INTEGER,
        expireTime: DataTypes.BIGINT,
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        buildingType: DataTypes.STRING,
        address: DataTypes.STRING,
        imageURL: DataTypes.STRING,
        phone: DataTypes.STRING,
        description: DataTypes.STRING
    }, {});
    House.associate = function(models) {
        // associations can be defined here
    };
    return House;
};
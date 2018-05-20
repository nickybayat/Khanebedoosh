'use strict';
module.exports = (sequelize, DataTypes) => {
    let RealStates = sequelize.define('RealStates', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Name: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {});
    RealStates.associate = function(models) {
        // associations can be defined here
    };
    return RealStates;
};
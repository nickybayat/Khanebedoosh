'use strict';
module.exports = (sequelize, DataTypes) => {
    let RealState = sequelize.define('RealStates', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Name: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {});
    RealState.associate = function(models) {
        // associations can be defined here
    };
    return RealState;
};
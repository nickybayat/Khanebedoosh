'use strict';
module.exports = (sequelize, DataTypes) => {
    let HouseIDs = sequelize.define('HouseIDs', {
        houseID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        IndividualUsername: DataTypes.STRING,
    }, {});
    HouseIDs.associate = function(models) {
        // associations can be defined here
    };
    return HouseIDs;
};
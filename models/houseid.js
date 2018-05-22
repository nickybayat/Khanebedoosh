'use strict';
module.exports = (sequelize, DataTypes) => {
    let HouseID = sequelize.define('HouseIDs', {
        houseID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        individualUsername: DataTypes.STRING,
    }, {timestamps: false});
    HouseID.associate = function (models) {
        // associations can be defined here
    };
    return HouseID;
};
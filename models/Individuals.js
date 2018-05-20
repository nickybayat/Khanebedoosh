'use strict';
module.exports = (sequelize, DataTypes) => {
    let Individuals = sequelize.define('Individuals', {
        Balance : DataTypes.INTEGER,
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Name: DataTypes.STRING,
        Password: DataTypes.STRING,
        Phone: DataTypes.STRING,
        phone: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {});
    Individuals.associate = function(models) {
        Individuals.hasMany(models.HouseIDs, { onDelete: 'cascade' });
    };
    return Individuals;
};
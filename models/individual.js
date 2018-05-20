'use strict';
module.exports = (sequelize, DataTypes) => {
    let Individual = sequelize.define('Individuals', {
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
    Individual.associate = function(models) {
        Individual.hasMany(models.HouseIDs, { onDelete: 'cascade' });
    };
    return Individual;
};
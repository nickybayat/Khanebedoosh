'use strict';
module.exports = (sequelize, DataTypes) => {
    let Individual = sequelize.define('Individuals', {
        balance : DataTypes.INTEGER,
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {});
    Individual.associate = function(models) {
        Individual.hasMany(models.HouseID, { onDelete: 'cascade' });
    };
    return Individual;
};
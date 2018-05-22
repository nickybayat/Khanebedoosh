'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('houses', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      area: {
        type: Sequelize.INTEGER
      },
      basePrice: {
        type: Sequelize.INTEGER
      },
      rentPrice: {
        type: Sequelize.INTEGER
      },
      sellPrice: {
        type: Sequelize.INTEGER
      },
      dealType: {
        type: Sequelize.INTEGER
      },
      expireTime: {
        type: Sequelize.BIGINT
      },
      buildingType: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      imageURL: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('houses');
  }
};
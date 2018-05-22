'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('houseIDs', {
      houseID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      individualUsername: {
        type: Sequelize.STRING,
        // onDelete: 'CASCADE',
        // refrences: {
        //   model: 'individuals',
        //   key: 'username'
        // }
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('houseIDs');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('realStates', {
      url: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING
      },
      name: {
          type: Sequelize.STRING
      },
        isAdmin:{
          type: Sequelize.BOOLEAN
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('realStates');
  }
};
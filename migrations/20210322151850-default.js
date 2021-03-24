'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('anime', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('anime');
  }
};

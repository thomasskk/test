"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("animes", "rating", Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("animes", "rating", Sequelize.INTEGER);
  },
};

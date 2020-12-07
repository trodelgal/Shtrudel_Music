'use strict';


const interactions = require('../data/interactions');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Interactions', interactions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Interactions', null, {});
  }
};
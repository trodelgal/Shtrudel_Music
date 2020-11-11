'use strict';


const artists = require('../data/artists');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', artists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', null, {});
  }
};

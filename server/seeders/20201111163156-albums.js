'use strict';


const albums = require('../data/albums');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', albums, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albums', null, {});
  }
};

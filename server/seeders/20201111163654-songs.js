'use strict';


const songs = require('../data/songs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Songs', songs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
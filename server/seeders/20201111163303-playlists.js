'use strict';


const playlists = require('../data/playlist');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Playlists', playlists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
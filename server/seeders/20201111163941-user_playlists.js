'use strict';


const user_playlists = require('../data/user_playlists');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users_playlists', user_playlists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users_playlists', null, {});
  }
};
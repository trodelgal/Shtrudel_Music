'use strict';


const user_playlists = require('../data/user_playlists');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_playlists', user_playlists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users_playlists', null, {});
  }
};
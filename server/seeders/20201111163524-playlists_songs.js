'use strict';


const playlistSongs = require('../data/playlist_songs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Playlists_songs', playlistSongs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Playlists_songs', null, {});
  }
};
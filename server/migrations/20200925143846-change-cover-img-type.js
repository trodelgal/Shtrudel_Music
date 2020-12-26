'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Artists',
      'cover_img',
      {
        type: Sequelize.TEXT,
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Artists',
      'cover_img'
    )
}
};
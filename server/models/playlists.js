'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Songs, {through: models.Playlists_songs});
      this.belongsToMany(models.Users, {through: models.users_playlists});
      // this.hasMany(models.users_playlists,{
      //   foreignKey: 'playlistId'
      // })
    }
  };
  Playlists.init({
    name: DataTypes.STRING,
    coverImg: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Playlists',
  });
  return Playlists;
};
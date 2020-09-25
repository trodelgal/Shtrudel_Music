'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artists, {
        foreignKey:'artistId'
      })
      this.belongsTo(models.Albums,{
        foreignKey:'albumId'
      })
      this.hasMany(models.Interactions,{
        foreignKey:'songId'
      })
      this.belongsToMany(models.Playlists, {through: models.Playlists_songs},{
        foreignKey: 'songId'
      });
    }
  };
  Songs.init({
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    length: DataTypes.STRING,
    youtubeLink: DataTypes.STRING,
    lyrics: DataTypes.STRING,
    trackNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Songs',
  });
  return Songs;
};
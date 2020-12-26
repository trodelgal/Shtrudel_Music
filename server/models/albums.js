'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Albums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Songs, {
        foreignKey:'albumId'
      })
      this.belongsTo(models.Artists,{
        foreignKey:'artistId'
      })
    }
  };
  Albums.init({
    name: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    coverImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Albums',
    paranoid: true,
    tableName: "Albums",
  });
  return Albums;
};
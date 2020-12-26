'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Songs, {
        foreignKey: 'artistId'
      })
      this.hasMany(models.Albums,{
        foreignKey:'artistId'
      })
    }
  };
  Artists.init({
    name: DataTypes.STRING,
    coverImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artists',
    paranoid: true,
    tableName: "Artists",
  });
  return Artists;
};
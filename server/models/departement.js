'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Departement.hasMany(models.User, { foreignKey: 'departementId' });
    }
  }
  Departement.init({
    departementName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Departement',
  });
  return Departement;
};
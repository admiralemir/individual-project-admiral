'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.Form, { foreignKey: 'carId' });
    }
  }
  Car.init({
    brand: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    plateNumber: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    year: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: { msg: 'Year must be an integer' }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Available'
    }
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};
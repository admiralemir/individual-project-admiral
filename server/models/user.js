'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Departement, { foreignKey: 'departementId' });
      User.hasMany(models.Form, { foreignKey: 'userId' });
    }
  }
  User.init({
    imageProfile: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Must be a valid email address' },
        notNull: { msg: 'Email is required' },
        notEmpty: { msg: 'Email should not be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        notEmpty: { msg: 'Password should not be empty' },
        len: {
          args: [6, 20],
          msg: 'Password length should be between 6 and 20 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Employee'
    },
    departementId: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: { msg: 'Departement ID must be an integer' }
      }
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        isInt: { msg: 'Phone number must be an integer' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  })
  return User;
};
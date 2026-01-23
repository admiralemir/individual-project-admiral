'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Form.belongsTo(models.User, { foreignKey: 'userId' });
      Form.belongsTo(models.Car, { foreignKey: 'carId' });
    }
  }
  Form.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User ID is required' },
        notEmpty: { msg: 'User ID should not be empty' },
        isInt: { msg: 'User ID must be an integer' }
      },
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Car ID is required' },
        notEmpty: { msg: 'Car ID should not be empty' },
        isInt: { msg: 'Car ID must be an integer' }
      },
      references: {
        model: 'Cars',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Borrow date is required' },
        notEmpty: { msg: 'Borrow date should not be empty' },
        // isBefore: { args: [new Date().toString()], msg: 'Borrow date must be in the future' },
        isDate: { msg: 'Borrow date must be a valid date' }
      }
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Return date is required' },
        notEmpty: { msg: 'Return date should not be empty' },
        isAfter(value) {
          if (new Date(value) <= new Date(this.borrowDate)) {
            throw new Error('Return date must be after borrow date');
          }
        },
        isDate: { msg: 'Return date must be a valid date' }
      }
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Purpose is required' },
        notEmpty: { msg: 'Purpose should not be empty' }
      }
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Destination is required' },
        notEmpty: { msg: 'Destination should not be empty' }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    }
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};
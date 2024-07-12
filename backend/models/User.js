const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  otp_expiry: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
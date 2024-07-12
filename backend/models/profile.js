
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true
  },
  altphone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hintname: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'profiles',
  timestamps: false
});

module.exports = Profile;

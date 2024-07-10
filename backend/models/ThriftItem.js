const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ThriftItem = sequelize.define('ThriftItem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },   
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  brand: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  material: {
    type: DataTypes.STRING,
  },
  condition: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  original_price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  location: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  shipping_options: {
    type: DataTypes.TEXT,
  },
  return_policy: {
    type: DataTypes.TEXT,
  },
  sustainability_impact: {
    type: DataTypes.TEXT,
  },
  ar_tag_url: {
    type: DataTypes.STRING,
  },
  ar_description: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'thrift_items',
  timestamps: false
});

module.exports = ThriftItem;


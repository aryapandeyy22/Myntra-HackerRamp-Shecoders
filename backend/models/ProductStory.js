// models/ProductStory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const ProductStory = sequelize.define('ProductStory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ThriftItem',
      key: 'id'
    }
  },
  storyTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  storyContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  storyImage: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'product_stories',
  timestamps: false
});

module.exports = ProductStory;

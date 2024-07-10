const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ThriftItem = require('./ThriftItem');

const ItemImage = sequelize.define('ItemImage', {
  thrift_item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ThriftItem,
      key: 'id'
    }
  },
  image_url: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'item_images',
  timestamps: false
});

ItemImage.belongsTo(ThriftItem, { foreignKey: 'thrift_item_id' });

module.exports = ItemImage;

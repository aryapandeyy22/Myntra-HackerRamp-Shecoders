const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const ThriftItem = require('./ThriftItem');

const ItemImage = sequelize.define('ItemImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  thrift_item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ThriftItem,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'item_images',
  timestamps: false
});

// Associations
ThriftItem.hasMany(ItemImage, { foreignKey: 'thrift_item_id' });
ItemImage.belongsTo(ThriftItem, { foreignKey: 'thrift_item_id' });

module.exports = ItemImage;

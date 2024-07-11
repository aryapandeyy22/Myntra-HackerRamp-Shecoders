const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Order = require('./Order');
const ThriftItem = require('./ThriftItem');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  thrift_item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ThriftItem,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'order_items',
  timestamps: false
});

module.exports = OrderItem;

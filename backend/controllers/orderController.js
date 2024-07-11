const db = require('../config/dbConfig');
const { promisify } = require('util');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const ThriftItem = require('../models/ThriftItem');
const User = require('../models/User');

const query = promisify(db.query).bind(db);

exports.addOrder = async (req, res) => {
  const { userId, items, totalPrice, status } = req.body;

  try {
    const order = await Order.create({
      user_id: userId,
      status: status || 'pending',
      total_price: totalPrice
    });

    const orderItems = items.map(item => ({
      order_id: order.id,
      thrift_item_id: item.thriftItemId,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: ThriftItem
            }
          ]
        },
        {
          model: User
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
};
exports.cancelOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      // Check if the order exists
      const order = await Order.findByPk(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update order status to 'Canceled'
      order.status = 'Canceled';
      await order.save();
  
      res.status(200).json({ message: 'Order canceled successfully', order });
    } catch (error) {
      console.error('Error canceling order:', error);
      res.status(500).json({ message: 'Error canceling order', error });
    }
  };
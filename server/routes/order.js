import express from 'express';
import { Order } from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/orders
 * @desc    Get order history for logged in user
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching order history.' });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Place a new saree order
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, shippingAddress } = req.body;

    const orderId = 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = await Order.create({
      orderId,
      user: req.userId,
      items,
      totalAmount,
      paymentMethod,
      shippingAddress,
      status: 'Processing',
      courier: 'Bluedart Express',
      trackingNumber: 'IND-EXPR-' + Math.floor(1000000 + Math.random() * 9000000),
      trackingUrl: 'https://www.bluedart.com/tracking',
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error placing order.' });
  }
});

export default router;

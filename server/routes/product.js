import express from 'express';
import { Product } from '../models/Product.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get catalog list with filters & sorting
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, occasion, minPrice, maxPrice, sort } = req.query;

    const query = {};
    if (category && category !== 'All') query.category = category;
    if (occasion && occasion !== 'All') query.occasion = occasion;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-low') sortOption = { price: 1 };
    else if (sort === 'price-high') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else sortOption = { createdAt: -1 };

    const products = await Product.find(query).sort(sortOption);
    res.json({ success: true, count: products.length, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching catalog.' });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product details
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching product.' });
  }
});

export default router;

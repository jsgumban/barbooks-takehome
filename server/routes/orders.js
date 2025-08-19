const express = require('express');
const { summarizeOrders } = require('../src/summarizeOrders');
const db = require('../config/database');
const router = express.Router();

const validateOrder = (product, qty, price) => {
  if (!product || typeof product !== 'string' || product.trim() === '') {
    return 'Product name is required and must be a non-empty string';
  }
  
  if (!qty || !Number.isInteger(qty) || qty <= 0) {
    return 'Quantity is required and must be a positive integer';
  }
  
  if (!price || typeof price !== 'number' || price <= 0) {
    return 'Price is required and must be a positive number';
  }
  
  return null;
};

// GET /api/summary
router.get('/summary', async (req, res) => {
  try {
    const orders = await db('orders').select('*');
    const summary = summarizeOrders(orders);
    res.json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders
router.get('/orders', async (req, res) => {
  try {
    const { product, limit, offset } = req.query;
    
    let query = db('orders').orderBy('id', 'desc');
    
    if (product) {
      query = query.where('product', 'like', `%${product}%`);
    }
    
    if (limit) {
      query = query.limit(parseInt(limit));
      if (offset) {
        query = query.offset(parseInt(offset));
      }
    }
    
    const orders = await query;
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/orders
router.post('/orders', async (req, res) => {
  try {
    const { product, qty, price } = req.body;
    
    const validationError = validateOrder(product, qty, price);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    
    const [insertId] = await db('orders').insert({
      product: product.trim(),
      qty,
      price
    });
    
    const newOrder = await db('orders').where('id', insertId).first();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
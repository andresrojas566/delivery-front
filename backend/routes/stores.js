const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /stores/:id/products - list products for a store
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ storeId: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

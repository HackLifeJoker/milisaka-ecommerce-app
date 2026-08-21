const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart
router.get('/', cartController.getCart);

// Add item
router.post('/add', cartController.addToCart);

// Update quantity
router.post('/update', cartController.updateItem);

// Remove item
router.post('/remove', cartController.removeItem);

// Clear cart
router.delete('/clear', cartController.clearCart);

module.exports = router;

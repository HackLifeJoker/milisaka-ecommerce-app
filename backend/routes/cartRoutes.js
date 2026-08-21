const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const Cart = require('../models/Cart');   // REQUIRED

// Get cart (user or guest)
router.get('/', cartController.getCart);

// Add item
router.post('/add', cartController.addToCart);

// Update quantity
router.post('/update', cartController.updateItem);

// Remove item
router.post('/remove', cartController.removeItem);

// Clear cart
router.delete('/clear', cartController.clearCart);

// Merge carts
router.post('/merge', async (req, res) => {
  const { guestId, userId } = req.body;

  if (!guestId || !userId) {
    return res.status(400).json({ error: 'guestId and userId required' });
  }

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ userId });

    if (!guestCart) {
      return res.json({ message: 'No guest cart to merge.' });
    }

    if (!userCart) {
      guestCart.userId = userId;
      guestCart.guestId = null;
      await guestCart.save();
      return res.json({ message: 'Guest cart moved to user.' });
    }

    const mergedItems = [...userCart.items];

    guestCart.items.forEach(guestItem => {
      const existing = mergedItems.find(i => i.productId === guestItem.productId);

      if (existing) {
        existing.quantity += guestItem.quantity;
      } else {
        mergedItems.push(guestItem);
      }
    });

    userCart.items = mergedItems;
    await userCart.save();

    await Cart.deleteOne({ guestId });

    res.json({ message: 'Carts merged successfully.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cart merge failed.' });
  }
});

module.exports = router;

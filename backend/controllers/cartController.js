const Cart = require('../models/Cart');

// helper: build query from userId/guestId
const getCartQuery = ({ userId, guestId }) =>
  userId ? { userId } : { guestId };

exports.getCart = async (req, res) => {
  try {
    const { userId, guestId } = req.query;
    const query = getCartQuery({ userId, guestId });

    const cart = await Cart.findOne(query);
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId, guestId, product } = req.body;
    const query = getCartQuery({ userId, guestId });

    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = new Cart({
        userId: userId || null,
        guestId: guestId || null,
        items: [product]
      });
    } else {
      const existing = cart.items.find(
        i => i.productId === product.productId
      );

      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        cart.items.push(product);
      }
    }

    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { userId, guestId, productId, quantity } = req.body;
    const query = getCartQuery({ userId, guestId });

    const cart = await Cart.findOne(query);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.quantity = quantity;
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, guestId, productId } = req.body;
    const query = getCartQuery({ userId, guestId });

    const cart = await Cart.findOne(query);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(i => i.productId !== productId);
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userId, guestId } = req.body;
    const query = getCartQuery({ userId, guestId });

    const cart = await Cart.findOne(query);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};

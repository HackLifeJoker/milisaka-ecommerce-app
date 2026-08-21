const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  guestId: { type: String, default: null },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);

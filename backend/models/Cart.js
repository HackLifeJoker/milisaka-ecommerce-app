const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  guestId: { type: String, default: null },

  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String }
    }
  ],

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);

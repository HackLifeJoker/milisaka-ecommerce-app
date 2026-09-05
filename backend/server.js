const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/cart', cartRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ status: 'Milisaka API running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

router.post('/', async (req, res) => {
    try {
        const order = req.body;

        const client = await MongoClient.connect(process.env.MONGO_URI);
        const db = client.db(process.env.DB_NAME);

        const result = await db.collection('orders').insertOne(order);

        client.close();

        res.status(201).json({ orderId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

module.exports = router;


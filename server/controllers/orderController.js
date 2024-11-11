const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
    const { items, shippingAddress, paymentStatus } = req.body;
    const patient = req.user.id;
    try {
        const order = new Order({ patient, items, shippingAddress, paymentStatus });
        await order.save();
        res.status(201).json({ message: 'Order placed', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get orders for a patient
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ patient: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

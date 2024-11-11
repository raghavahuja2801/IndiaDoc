const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ name: String, quantity: Number }],
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' },
    shippingAddress: { type: String, required: true },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
});

module.exports = mongoose.model('Order', OrderSchema);

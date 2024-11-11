const express = require('express');
const { placeOrder, getOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, placeOrder);
router.get('/', authMiddleware, getOrders);

module.exports = router;

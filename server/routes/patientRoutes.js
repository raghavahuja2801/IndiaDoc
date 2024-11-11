const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Define patient-specific routes here, if needed
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;

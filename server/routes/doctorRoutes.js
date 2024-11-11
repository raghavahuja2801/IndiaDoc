const express = require('express');
const { getAllDoctors, addDoctor } = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllDoctors);
router.post('/', authMiddleware, addDoctor);

module.exports = router;

const express = require("express");
const {
  getAllDoctors,
  addDoctor,
  getDoctorsBySpecialization,
} = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getAllDoctors);
router.post("/", authMiddleware, addDoctor);
router.get("/specialization", authMiddleware, getDoctorsBySpecialization);

module.exports = router;

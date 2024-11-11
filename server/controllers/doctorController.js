const Doctor = require('../models/Doctor');

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('user', 'name email');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new doctor
exports.addDoctor = async (req, res) => {
    const { user, specialization, availableHours } = req.body;
    try {
        const doctor = new Doctor({ user, specialization, availableHours });
        await doctor.save();
        res.status(201).json({ message: 'Doctor added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    specialization: { type: String, required: true },
    availableHours: [{ start: String, end: String }],
});

module.exports = mongoose.model('Doctor', DoctorSchema);

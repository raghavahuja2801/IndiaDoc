const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' },
    zoomLink: { type: String },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);

const Appointment = require("../models/Appointment");

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { patient, doctor, date } = req.body;
  try {
    const appointment = new Appointment({ patient, doctor, date });
    await appointment.save();
    res.status(201).json({ message: "Appointment created", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get appointments for a user
exports.getAppointments = async (req, res) => {
  const userId = req.user.id;
  try {
    const appointments = await Appointment.find({
      $or: [{ patient: userId }, { doctor: userId }],
    })
      .populate("doctor", "specialization")
      .populate("patient", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Doctor = require("../models/Doctor");

// Get all doctors with full user data
exports.getAllDoctors = async (req, res) => {
  try {
    // Populate the 'user' field with the entire User document
    const doctors = await Doctor.find().populate("user");
    res.json(doctors); // Return the populated doctors
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new doctor
exports.addDoctor = async (req, res) => {
  const { specialization, availableHours } = req.body;
  const userId = req.user._id;
  try {
    const doctor = new Doctor({
      _id: userId, // Set the _id of the Doctor to match the User's _id
      user: userId, // Reference the same user in the 'user' field
      specialization,
      availableHours,
    });
    await doctor.save();
    res.status(201).json({ message: "Doctor added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get doctors by specialization
exports.getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.query; // Get specialization from query parameters
  try {
    if (!specialization) {
      return res.status(400).json({ error: "Specialization is required" });
    }
    // Find doctors matching the specialization and populate the 'user' field
    const doctors = await Doctor.find({ specialization }).populate("user");
    res.json(doctors); // Return the filtered doctors
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require('cors');


// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend's URL


// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/appointments", require("./routes/appointmentroutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

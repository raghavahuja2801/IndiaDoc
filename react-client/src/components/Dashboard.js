import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Dashboard() {
  const [specialization, setSpecialization] = useState(""); // Selected specialization
  const [doctors, setDoctors] = useState([]); // Doctors data
  const [error, setError] = useState(null); // Error state
  const [selectedDoctor, setSelectedDoctor] = useState(""); // Selected doctor
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // Selected time slot
  const [successMessage, setSuccessMessage] = useState(""); // Appointment confirmation message
  const { user } = useAuth(); // Access user details from Auth Context

  // Fetch doctors based on specialization
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!specialization) {
        setDoctors([]); // Reset doctors list if no specialization is selected
        return;
      }

      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Make the GET request with token in the Authorization header
        const response = await axios.get(
          "http://localhost:5001/api/doctors/specialization",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in header
            },
            params: { specialization }, // Pass specialization as query parameter
          }
        );
        setDoctors(response.data); // Update doctors list
        setError(null); // Clear any errors
        console.log("Doctors:", response.data);
      } catch (err) {
        setError("Failed to fetch doctors. Please try again.");
        console.error(err);
        setDoctors([]); // Reset doctors list on error
      }
    };

    fetchDoctors();
  }, [specialization]); // Re-fetch doctors whenever the specialization changes

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedTimeSlot) {
      setError("Please select a doctor and a time slot."); // Error if required fields are missing
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage

      // Construct the appointment data
      const appointmentData = {
        patient: user._id, // Replace with the logged-in user's ID
        doctor: selectedDoctor,
        date: selectedTimeSlot, // Assuming selectedTimeSlot contains the date and time
      };

      // Send POST request to create an appointment
      const response = await axios.post(
        "http://localhost:5001/api/appointments",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with the token
          },
        }
      );

      setSuccessMessage(response.data.message); // Display success message
      setError(null); // Clear any errors
      console.log("Appointment created:", response.data.appointment);
    } catch (err) {
      setError("Failed to book the appointment. Please try again."); // Handle errors
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-6">
            Doctor Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Booking Section */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                Book a Consultation
              </h2>

              {/* Specialization Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Specialization
                </label>
                <select
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="">Choose a specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatologist">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Practitioner">
                    General Practitioner
                  </option>
                </select>
              </div>

              {/* Doctors List */}
              <div>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
                {doctors.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {doctors.map((doctor) => (
                      <li key={doctor._id} className="py-4">
                        <p className="text-lg font-semibold text-green-700">
                          {doctor.user.name} ({doctor.specialization})
                        </p>
                        <p className="text-sm text-gray-600">
                          {doctor.user.email}
                        </p>
                        <label
                          htmlFor={`doctor-${doctor._id}`}
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Select Time Slot
                        </label>
                        <select
                          id={`doctor-${doctor._id}`}
                          onChange={(e) => {
                            setSelectedDoctor(doctor._id);
                            setSelectedTimeSlot(e.target.value);
                          }}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                          <option value="">Choose a time slot</option>
                          {doctor.availableHours.map((slot) => (
                            <option
                              key={slot._id}
                              value={`${slot.start}-${slot.end}`}
                            >
                              {slot.start} - {slot.end}
                            </option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    No doctors available for the selected specialization.
                  </p>
                )}
              </div>

              <button
                onClick={handleBooking}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Confirm Appointment
              </button>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
              <div className="bg-orange-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-orange-800 mb-2">
                  Quick Actions
                </h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/consultations"
                      className="text-orange-600 hover:text-orange-800"
                    >
                      View Upcoming Consultations
                    </a>
                  </li>
                  <li>
                    <a
                      href="/orders"
                      className="text-orange-600 hover:text-orange-800"
                    >
                      Order Medicines
                    </a>
                  </li>
                  <li>
                    <a
                      href="/resources"
                      className="text-orange-600 hover:text-orange-800"
                    >
                      Health Resources
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

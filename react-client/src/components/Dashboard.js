import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./PatientNavbar";
import Footer from "./Footer";
import { db } from "../firebase";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

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
        // Firestore query to fetch doctors by specialization
        const doctorsQuery = query(
          collection(db, "doctor_data"),
          where("specialization", "==", specialization)
        );
        const querySnapshot = await getDocs(doctorsQuery);

        const doctorsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDoctors(doctorsList); // Update doctors list
        setError(null); // Clear any errors
      } catch (err) {
        setError("Failed to fetch doctors. Please try again.");
        setDoctors([]); // Reset doctors list on error
      }
    };

    fetchDoctors();
  }, [specialization]);

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedTimeSlot) {
      setError("Please select a doctor and a time slot."); // Error if required fields are missing
      return;
    }

    try {
      // Construct the appointment data
      const appointmentData = {
        patientId: user?.uid,
        doctorId: selectedDoctor,
        timeSlot: selectedTimeSlot,
      };

      // Save appointment to Firestore
      await setDoc(
        doc(db, "appointments", `${user.uid}_${selectedDoctor}`),
        appointmentData
      );

      setSuccessMessage("Appointment booked successfully!");
      setError(null); // Clear any errors
    } catch (err) {
      setError("Failed to book the appointment. Please try again."); // Handle errors
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
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="general">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="bg-white shadow rounded-lg p-4 border"
                      >
                        <img
                          src={doctor.profileImage}
                          alt={`${doctor.name}'s Profile`}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold text-green-700">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Specialization: {doctor.specialization}
                        </p>
                        <p className="text-sm text-gray-500">
                          Experience: {doctor.experience} years
                        </p>
                        <p className="text-sm text-gray-500">
                          License: {doctor.license}
                        </p>
                        <p className="text-sm text-gray-500">
                          Bio: {doctor.bio}
                        </p>
                        <a
                          href={doctor.degree}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          View Degree
                        </a>
                        <div className="mt-4">
                          <label
                            htmlFor={`doctor-${doctor.id}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select Time Slot
                          </label>
                          <select
                            id={`doctor-${doctor.id}`}
                            onChange={(e) => {
                              setSelectedDoctor(doctor.id);
                              setSelectedTimeSlot(e.target.value);
                            }}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                          >
                            <option value="">Choose a time slot</option>
                            {Object.entries(doctor.selectedSlots).map(
                              ([day, slots]) =>
                                slots.map((slot, index) => (
                                  <option
                                    key={`${day}-${index}`}
                                    value={`${day} ${slot.start}-${slot.end}`}
                                  >
                                    {day} {slot.start} - {slot.end}
                                  </option>
                                ))
                            )}
                          </select>
                        </div>
                        <button
                          onClick={handleBooking}
                          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Book Appointment
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No doctors available for the selected specialization.
                  </p>
                )}
              </div>
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

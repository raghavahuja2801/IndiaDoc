import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/authContext"; // Import the Auth context

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { user, logout } = useAuth(); // Access the user state and logout function
  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Booking:", { selectedSpecialty, selectedDate, selectedTime });
    alert("Consultation booked successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-6">
            Welcome back, {user.name}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Booking Section */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                Book a Consultation
              </h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label
                    htmlFor="specialty"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Specialty
                  </label>
                  <select
                    id="specialty"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Choose a specialty</option>
                    <option value="general">General Practitioner</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Time
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Choose a time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Book Consultation
                </button>
              </form>
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-orange-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-orange-800 mb-2">
                  Quick Actions
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/consultations"
                      className="text-orange-600 hover:text-orange-800 flex items-center"
                    >
                      View Upcoming Consultations
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="text-orange-600 hover:text-orange-800 flex items-center"
                    >
                      Order Medicines
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/resources"
                      className="text-orange-600 hover:text-orange-800 flex items-center"
                    >
                      Health Resources
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Health Summary */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  Your Health Summary
                </h2>
                <p className="text-gray-600 mb-4">
                  Last check-up: 3 months ago
                </p>
                <Link
                  to="/health-record"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  View Full Health Record →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

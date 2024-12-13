import React, { useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import DoctorNavbar from "./Doctor-Navbar";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { db, storage } from "../firebase"; // Import the Firebase database
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage functions

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const START_HOUR = 9;
const END_HOUR = 17;
const SLOT_DURATION = 30; // in minutes

export default function DoctorOnboarding() {
  const { currentUser, logout } = useAuth(); // Access Auth Context functions
  const navigate = useNavigate(); // Access the navigate function from the useNavigate hook
  const [formData, setFormData] = useState({
    phone: "",
    specialization: "",
    experience: "",
    license: "",
    bio: "",
    status: "pending",
    degree: null, // For file input
  });

  const [selectedSlots, setSelectedSlots] = useState({});
  const [activeTab, setActiveTab] = useState(DAYS_OF_WEEK[0]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const toggleSlot = (day, slot) => {
    setSelectedSlots((prev) => {
      const daySlots = prev[day] || [];
      const slotIndex = daySlots.findIndex(
        (s) => s.start === slot.start && s.end === slot.end
      );

      if (slotIndex > -1) {
        // Remove slot if already selected
        return {
          ...prev,
          [day]: daySlots.filter((_, i) => i !== slotIndex),
        };
      } else {
        // Add slot if not selected
        return {
          ...prev,
          [day]: [...daySlots, slot],
        };
      }
    });
  };

  const isSlotSelected = (day, slot) => {
    return (selectedSlots[day] || []).some(
      (s) => s.start === slot.start && s.end === slot.end
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let degreeUrl = null;
  
      // Check if the degree file is present in formData
      if (formData.degree) {
        const fileRef = ref(storage, `medical_degrees/${currentUser.uid}/${formData.degree.name}`);
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(fileRef, formData.degree);
        // Get the file's download URL
        degreeUrl = await getDownloadURL(snapshot.ref);
      }
  
      // Add the download URL to the form data
      const doctorData = {
        ...formData,
        degree: degreeUrl, // Include the download URL
        selectedSlots,
      };
  
      // Save the form data and file URL to Firestore
      await setDoc(doc(db, "doctor_data", currentUser.uid), doctorData, {
        merge: true,
      });
  
      alert("Thank You for completing your profile!, You will be notified once your profile is approved");
      console.log("Form submitted successfully", doctorData);
      logout(); // Log out the user after submitting the form
      navigate("/"); // Redirect to the home  page
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };
  

  const timeSlots = Array.from(
    { length: (END_HOUR - START_HOUR) * (60 / SLOT_DURATION) },
    (_, i) => {
      const startHour = START_HOUR + Math.floor((i * SLOT_DURATION) / 60);
      const startMinute = (i * SLOT_DURATION) % 60;
      const endHour = START_HOUR + Math.floor(((i + 1) * SLOT_DURATION) / 60);
      const endMinute = ((i + 1) * SLOT_DURATION) % 60;
      return {
        start: `${startHour.toString().padStart(2, "0")}:${startMinute
          .toString()
          .padStart(2, "0")}`,
        end: `${endHour.toString().padStart(2, "0")}:${endMinute
          .toString()
          .padStart(2, "0")}`,
      };
    }
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DoctorNavbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-6">
            Complete Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700">
                Personal Information
              </h2>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700">
                Professional Information
              </h2>
              <div>
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700"
                >
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.specialization}
                  onChange={handleInputChange}
                >
                  <option value="">Select your specialization</option>
                  <option value="general">General Practitioner</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="license"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medical License Number
                </label>
                <input
                  type="text"
                  id="license"
                  name="license"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={formData.license}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Medical Degree
                </label>
                <input
                  type="file"
                  id="degree"
                  name="degree"
                  accept=".pdf,.jpg,.png"
                  required
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Professional Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Tell us about your professional background and expertise..."
                  value={formData.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700">
                Availability
              </h2>
              <div className="flex justify-between border-b border-gray-300">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setActiveTab(day)}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === day
                        ? "text-green-700 border-b-2 border-green-700"
                        : "text-gray-500 hover:text-green-700"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => toggleSlot(activeTab, slot)}
                      className={`flex items-center justify-center px-3 py-2 border ${
                        isSlotSelected(activeTab, slot)
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                      } rounded-md`}
                    >
                      {slot.start}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Save Profile
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DoctorNavbar from "./Doctor-Navbar";
import Footer from "./Footer";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format, addDays, startOfDay, addMinutes } from "date-fns";

const DoctorProfile = () => {
  const { userProfile, currentUser } = useAuth();
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileRef = doc(db, "doctor_data", currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const savedAvailability = profileSnap.data().availability || [];
          setAvailability(savedAvailability.map(a => ({
            date: new Date(a.date),
            slots: a.slots.map(slot => ({
              start: new Date(slot.start),
              end: new Date(slot.end),
              status: slot.status || "available", // Default to "available" if not defined
            }))
          })));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  const getNext7Days = () => {
    const today = startOfDay(new Date());
    return Array.from({ length: 7 }, (_, i) => addDays(today, i));
  };

  const generateTimeSlots = (date) => {
    const startOfDay = new Date(date.setHours(9, 0, 0)); // Start at 9:00 AM
    const endOfDay = new Date(date.setHours(17, 0, 0)); // End at 5:00 PM

    const slots = [];
    let currentTime = startOfDay;

    while (currentTime < endOfDay) {
      const nextSlot = addMinutes(currentTime, 15);
      slots.push({
        start: new Date(currentTime),
        end: new Date(nextSlot),
        status: "available", // Default to "available"
      });
      currentTime = nextSlot;
    }

    return slots;
  };

  const handleSlotSelect = (day, slot) => {
    setAvailability((prev) => {
      const existing = prev.find((a) => a.date.getTime() === day.getTime());
      const updatedSlots = existing
        ? {
            ...existing,
            slots: existing.slots.some(
              (s) => s.start.getTime() === slot.start.getTime()
            )
              ? existing.slots.filter(
                  (s) => s.start.getTime() !== slot.start.getTime() || s.status === "booked"
                ) // Do not remove if slot is "booked"
              : [...existing.slots, slot],
          }
        : { date: day, slots: [slot] };

      return prev.filter((a) => a.date.getTime() !== day.getTime()).concat(updatedSlots);
    });
  };

  const saveAvailability = async () => {
    try {
      const formattedAvailability = availability.map((day) => ({
        date: day.date.toISOString(),
        slots: day.slots.map((slot) => ({
          start: slot.start.toISOString(),
          end: slot.end.toISOString(),
          status: slot.status, // Include status
        })),
      }));

      const profileRef = doc(db, "doctor_data", currentUser.uid);
      await setDoc(profileRef, { availability: formattedAvailability }, { merge: true });
      alert("Availability updated successfully!");
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Failed to update availability. Please try again.");
    }
  };

  const next7Days = getNext7Days();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DoctorNavbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Doctor Profile</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">Profile Information</h2>
                <p className="text-sm text-gray-700"><strong>Name:</strong> {userProfile?.name}</p>
                <p className="text-sm text-gray-700"><strong>Email:</strong> {userProfile?.email}</p>
                <p className="text-sm text-gray-700"><strong>Specialization:</strong> {userProfile?.specialization}</p>
                <p className="text-sm text-gray-700"><strong>Experience:</strong> {userProfile?.experience} years</p>
                <p className="text-sm text-gray-700"><strong>License:</strong> {userProfile?.license}</p>
                <p className="text-sm text-gray-700"><strong>Bio:</strong> {userProfile?.bio}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">Set Availability</h2>
                {next7Days.map((day) => (
                  <div key={day} className="mb-4">
                    <h3 className="text-lg font-medium text-green-600">
                      {format(day, "EEEE, MMM d")}
                    </h3>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {generateTimeSlots(day).map((slot, index) => {
                        const isBooked = availability.find(
                          (a) =>
                            a.date.getTime() === day.getTime() &&
                            a.slots.some(
                              (s) => s.start.getTime() === slot.start.getTime() && s.status === "booked"
                            )
                        );

                        return (
                          <button
                            key={index}
                            onClick={() => !isBooked && handleSlotSelect(day, slot)}
                            className={`px-2 py-1 border rounded-md text-sm ${
                              isBooked
                                ? "bg-red-500 text-white cursor-not-allowed"
                                : availability.find(
                                    (a) =>
                                      a.date.getTime() === day.getTime() &&
                                      a.slots.some(
                                        (s) => s.start.getTime() === slot.start.getTime()
                                      )
                                  )
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                            disabled={isBooked}
                          >
                            {format(slot.start, "HH:mm")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <button
                  onClick={saveAvailability}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Save Availability
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorProfile;

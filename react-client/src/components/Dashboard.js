// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "./PatientNavbar";
// import Footer from "./Footer";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   addDoc,
// } from "firebase/firestore";
// import { format, toZonedTime } from "date-fns-tz";

// export default function Dashboard() {
//   const [specialization, setSpecialization] = useState(""); // Selected specialization
//   const [doctors, setDoctors] = useState([]); // Doctors data
//   const [error, setError] = useState(null); // Error state
//   const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Selected time slot
//   const [successMessage, setSuccessMessage] = useState(""); // Appointment confirmation message
//   const { currentUser } = useAuth(); // Access user details from Auth Context

//   // Fetch doctors based on specialization
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       if (!specialization) {
//         setDoctors([]); // Reset doctors list if no specialization is selected
//         return;
//       }
  
//       try {
//         const doctorsQuery = query(
//           collection(db, "doctor_data"),
//           where("specialization", "==", specialization)
//         );
//         const querySnapshot = await getDocs(doctorsQuery);
  
//         const doctorsList = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           const availability = (data.availability || []).map((day) => {
//             const validDate = day.date?.toDate ? day.date.toDate() : new Date(day.date);
//             if (isNaN(validDate)) return null;
  
//             return {
//               date: validDate,
//               slots: day.slots.map((slot) => {
//                 const start = slot.start?.toDate ? slot.start.toDate() : new Date(slot.start);
//                 const end = slot.end?.toDate ? slot.end.toDate() : new Date(slot.end);
//                 if (isNaN(start) || isNaN(end)) return null;
  
//                 return {
//                   ...slot,
//                   start,
//                   end,
//                 };
//               }).filter((slot) => slot), // Filter out invalid slots
//             };
//           }).filter((day) => day); // Filter out invalid days
  
//           return {
//             id: doc.id,
//             ...data,
//             availability,
//           };
//         });
  
//         setDoctors(doctorsList); // Update doctors list
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//         setError("Failed to fetch doctors. Please try again.");
//         setDoctors([]);
//       }
//     };
  
//     fetchDoctors();
//   }, [specialization]);
  

//   const handleBooking = async () => {
//     if (!selectedDoctor || !selectedTimeSlot) {
//       setError("Please select a doctor and a time slot."); // Error if required fields are missing
//       return;
//     }

//     try {
//       // Generate a placeholder Zoom link (can be replaced with API integration)
//       const zoomLink = "https://zoom.us/meeting-link-placeholder";

//       // Construct the appointment data
//       const appointmentData = {
//         patientId: currentUser?.uid,
//         doctorId: selectedDoctor.id,
//         timeSlot: {
//           start: selectedTimeSlot.start.toISOString(),
//           end: selectedTimeSlot.end.toISOString(),
//         },
//         zoomLink,
//       };

//       // Save appointment to Firestore
//       const appointmentRef = await addDoc(collection(db, "appointments"), appointmentData);

//       // Update doctor's availability to mark the slot as booked
//       const updatedAvailability = selectedDoctor.availability.map((day) => {
//         if (
//           format(day.date, "yyyy-MM-dd") ===
//           format(toZonedTime(selectedTimeSlot.start, "UTC"), "yyyy-MM-dd")
//         ) {
//           return {
//             ...day,
//             slots: day.slots.map((slot) =>
//               slot.start.getTime() === selectedTimeSlot.start.getTime()
//                 ? { ...slot, status: "booked", appointmentId: appointmentRef.id }
//                 : slot
//             ),
//           };
//         }
//         return day;
//       });

//       await setDoc(doc(db, "doctor_data", selectedDoctor.id), { availability: updatedAvailability }, { merge: true });

//       setSuccessMessage("Appointment booked successfully!");
//       setError(null); // Clear any errors
//     } catch (err) {
//       console.error("Failed to book appointment:", err);
//       setError("Failed to book the appointment. Please try again."); // Handle errors
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />
//       <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-green-800 mb-6">Patient Dashboard</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold text-green-700 mb-4">Book a Consultation</h2>

//               {/* Specialization Dropdown */}
//               <div className="mb-4">
//                 <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
//                   Select Specialization
//                 </label>
//                 <select
//                   id="specialization"
//                   value={specialization}
//                   onChange={(e) => setSpecialization(e.target.value)}
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
//                 >
//                   <option value="">Choose a specialization</option>
//                   <option value="cardiology">Cardiology</option>
//                   <option value="dermatology">Dermatology</option>
//                   <option value="neurology">Neurology</option>
//                   <option value="pediatrics">Pediatrics</option>
//                   <option value="general">General Practitioner</option>
//                 </select>
//               </div>

//               {/* Doctors List */}
//               <div>
//                 {error && <p className="text-red-500">{error}</p>}
//                 {successMessage && <p className="text-green-500">{successMessage}</p>}
//                 {doctors.length > 0 ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {doctors.map((doctor) => (
//                       <div
//                         key={doctor.id}
//                         className="bg-white shadow rounded-lg p-4 border"
//                         onClick={() => setSelectedDoctor(doctor)}
//                       >
//                         <img
//                           src={doctor.profileImage}
//                           alt={`${doctor.name}'s Profile`}
//                           className="w-full h-40 object-cover rounded-md mb-4"
//                         />
//                         <h3 className="text-lg font-semibold text-green-700">{doctor.name}</h3>
//                         <p className="text-sm text-gray-500">Specialization: {doctor.specialization}</p>
//                         <p className="text-sm text-gray-500">Experience: {doctor.experience} years</p>
//                         <p className="text-sm text-gray-500">License: {doctor.license}</p>
//                         <p className="text-sm text-gray-500">Bio: {doctor.bio}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No doctors available for the selected specialization.</p>
//                 )}
//               </div>

//               {selectedDoctor && (
//   <div className="mt-6">
//     <h2 className="text-xl font-semibold text-green-700 mb-4">Available Slots</h2>
//     {selectedDoctor.availability.length === 0 ? (
//       <p className="text-gray-500">No slots available for this doctor.</p>
//     ) : (
//       <div className="grid grid-cols-4 gap-4">
//         {selectedDoctor.availability.map((day) => {
//           const parsedDate = new Date(day.date);
//           if (isNaN(parsedDate)) return null;

//           return (
//             <div key={parsedDate} className="mb-4">
//               <h3 className="text-lg font-medium text-gray-700">
//                 {format(parsedDate, "EEEE, MMM d")}
//               </h3>
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 {day.slots.length === 0 ? (
//                   <p className="text-sm text-gray-500">No slots available</p>
//                 ) : (
//                   day.slots.map((slot, index) => {
//                     const start = slot.start ? new Date(slot.start) : null;
//                     if (!start || isNaN(start)) return null;

//                     return (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedTimeSlot(slot)}
//                         className={`px-2 py-1 border rounded-md text-sm ${
//                           slot.status === "booked"
//                             ? "bg-red-500 text-white cursor-not-allowed"
//                             : selectedTimeSlot === slot
//                             ? "bg-green-600 text-white"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                         disabled={slot.status === "booked"}
//                       >
//                         {format(start, "HH:mm")}
//                       </button>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     )}
//     <button
//       onClick={handleBooking}
//       className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
//     >
//       Book Appointment
//     </button>
//   </div>
// )}

//             </div>

//             {/* Sidebar Section */}
//             <div className="space-y-6">
//               <div className="bg-orange-50 p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold text-orange-800 mb-2">Quick Actions</h2>
//                 <ul className="space-y-2">
//                   <li>
//                     <a href="/consultations" className="text-orange-600 hover:text-orange-800">
//                       View Upcoming Consultations
//                     </a>
//                   </li>
//                   <li>
//                     <a href="/orders" className="text-orange-600 hover:text-orange-800">
//                       Order Medicines
//                     </a>
//                   </li>
//                   <li>
//                     <a href="/resources" className="text-orange-600 hover:text-orange-800">
//                       Health Resources
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./PatientNavbar";
import Footer from "./Footer";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { format, toZonedTime } from "date-fns-tz";

export default function Dashboard() {
  const [specialization, setSpecialization] = useState(""); // Selected specialization
  const [doctors, setDoctors] = useState([]); // Doctors data
  const [error, setError] = useState(null); // Error state
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Selected time slot
  const [successMessage, setSuccessMessage] = useState(""); // Appointment confirmation message
  const { currentUser } = useAuth(); // Access user details from Auth Context

  // Fetch doctors based on specialization
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!specialization) {
        setDoctors([]); // Reset doctors list if no specialization is selected
        return;
      }
  
      try {
        const doctorsQuery = query(
          collection(db, "doctor_data"),
          where("specialization", "==", specialization)
        );
        const querySnapshot = await getDocs(doctorsQuery);
  
        const doctorsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const availability = (data.availability || []).map((day) => {
            const validDate = day.date?.toDate ? day.date.toDate() : new Date(day.date);
            if (isNaN(validDate)) return null;
  
            return {
              date: validDate,
              slots: day.slots.map((slot) => {
                const start = slot.start?.toDate ? slot.start.toDate() : new Date(slot.start);
                const end = slot.end?.toDate ? slot.end.toDate() : new Date(slot.end);
                if (isNaN(start) || isNaN(end)) return null;
  
                return {
                  ...slot,
                  start,
                  end,
                };
              }).filter((slot) => slot), // Filter out invalid slots
            };
          }).filter((day) => day); // Filter out invalid days
  
          return {
            id: doc.id,
            ...data,
            availability,
          };
        });
  
        setDoctors(doctorsList); // Update doctors list
        setError(null);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to fetch doctors. Please try again.");
        setDoctors([]);
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
      // Generate a placeholder Zoom link (can be replaced with API integration)
      const zoomLink = "https://zoom.us/meeting-link-placeholder";

      // Construct the appointment data
      const appointmentData = {
        patientId: currentUser?.uid,
        doctorId: selectedDoctor.id,
        timeSlot: {
          start: selectedTimeSlot.start.toISOString(),
          end: selectedTimeSlot.end.toISOString(),
        },
        zoomLink,
      };

      // Save appointment to Firestore
      const appointmentRef = await addDoc(collection(db, "appointments"), appointmentData);

      // Update doctor's availability to mark the slot as booked
      const updatedAvailability = selectedDoctor.availability.map((day) => {
        if (
          format(day.date, "yyyy-MM-dd") ===
          format(toZonedTime(selectedTimeSlot.start, "UTC"), "yyyy-MM-dd")
        ) {
          return {
            ...day,
            slots: day.slots.map((slot) =>
              slot.start.getTime() === selectedTimeSlot.start.getTime()
                ? { ...slot, status: "booked", appointmentId: appointmentRef.id }
                : slot
            ),
          };
        }
        return day;
      });

      await setDoc(doc(db, "doctor_data", selectedDoctor.id), { availability: updatedAvailability }, { merge: true });

      // Update local state to reflect the booking
      setSelectedDoctor((prev) => ({
        ...prev,
        availability: updatedAvailability,
      }));

      setSuccessMessage("Appointment booked successfully!");
      setError(null); // Clear any errors
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setError("Failed to book the appointment. Please try again."); // Handle errors
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Patient Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Book a Consultation</h2>

              {/* Specialization Dropdown */}
              <div className="mb-4">
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
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
                  <option value="general">General Practitioner</option>
                </select>
              </div>

              {/* Doctors List */}
              <div>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {doctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="bg-white shadow rounded-lg p-4 border"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        <img
                          src={doctor.profileImage}
                          alt={`${doctor.name}'s Profile`}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold text-green-700">{doctor.name}</h3>
                        <p className="text-sm text-gray-500">Specialization: {doctor.specialization}</p>
                        <p className="text-sm text-gray-500">Experience: {doctor.experience} years</p>
                        <p className="text-sm text-gray-500">License: {doctor.license}</p>
                        <p className="text-sm text-gray-500">Bio: {doctor.bio}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No doctors available for the selected specialization.</p>
                )}
              </div>

              {selectedDoctor && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-green-700 mb-4">Available Slots</h2>
                  {selectedDoctor.availability.length === 0 ? (
                    <p className="text-gray-500">No slots available for this doctor.</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      {selectedDoctor.availability.map((day) => {
                        const parsedDate = new Date(day.date);
                        if (isNaN(parsedDate)) return null;
                        return (
                          <div key={parsedDate} className="mb-4">
                            <h3 className="text-lg font-medium text-gray-700">
                              {format(parsedDate, "EEEE, MMM d")}
                            </h3>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {day.slots.map((slot, index) => {
                                const start = slot.start ? new Date(slot.start) : null;
                                if (!start || isNaN(start)) return null;
                                return (
                                  <button
                                    key={index}
                                    onClick={() => setSelectedTimeSlot(slot)}
                                    className={`px-2 py-1 border rounded-md text-sm ${
                                      slot.status === "booked"
                                        ? "bg-red-500 text-white cursor-not-allowed"
                                        : selectedTimeSlot === slot
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                    disabled={slot.status === "booked"}
                                  >
                                    {format(start, "HH:mm")}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <button
                    onClick={handleBooking}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Section */}
            <div className="space-y-6">
              <div className="bg-orange-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-orange-800 mb-2">Quick Actions</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="/consultations" className="text-orange-600 hover:text-orange-800">
                      View Upcoming Consultations
                    </a>
                  </li>
                  <li>
                    <a href="/orders" className="text-orange-600 hover:text-orange-800">
                      Order Medicines
                    </a>
                  </li>
                  <li>
                    <a href="/resources" className="text-orange-600 hover:text-orange-800">
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

// MessagesPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

//Component imports 
import ConversationsList from './chatlist';
import ChatWindow from './chat';
import PatientNavbar from './PatientNavbar';
import DoctorNavbar from './Doctor-Navbar';
import Footer from './Footer';

const MessagesPage = () => {
  // State management
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const { userProfile } = useAuth();

  // Determine which navbar to show based on user type
  const isDoctor = userProfile?.type === "doctor";
  const Navbar = isDoctor ? DoctorNavbar : PatientNavbar;

  // Fetch all available doctors
  const fetchAvailableDoctors = async () => {
    try {
      const doctorsSnapshot = await getDocs(collection(db, 'doctor_data'));
      const doctors = [];
      doctorsSnapshot.forEach((doc) => {
        // Only add approved doctors
        if (doc.data().status === 'approved') {
          doctors.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });
      setAvailableDoctors(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // New Chat Dialog Component
  const NewChatDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Start New Conversation</h3>
          <button
            onClick={() => setShowNewChat(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        {availableDoctors.length > 0 ? (
          <div className="space-y-2">
            {availableDoctors.map(doctor => (
              <div
                key={doctor.id}
                onClick={() => {
                  setSelectedRecipient(doctor);
                  setShowNewChat(false);
                }}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {doctor.profileImage && (
                    <img 
                      src={doctor.profileImage} 
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-500">
                      {doctor.specialization}
                      {doctor.experience && ` • ${doctor.experience} years experience`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No doctors available at the moment.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex gap-4 h-[calc(100vh-200px)]">
          {/* Conversations Sidebar */}
          <div className="w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
              {!isDoctor && (
                <button
                  onClick={() => {
                    fetchAvailableDoctors();
                    setShowNewChat(true);
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  New Chat
                </button>
              )}
            </div>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              <ConversationsList
                onSelectConversation={(recipient) => setSelectedRecipient(recipient)}
              />
            </div>
          </div>

          {/* Chat Window */}
          <div className="w-2/3">
            {selectedRecipient ? (
              <ChatWindow
                recipientId={selectedRecipient.id}
                recipientName={selectedRecipient.name}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-md">
                <p className="text-gray-500">Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>

        {/* New Chat Dialog */}
        {showNewChat && <NewChatDialog />}
      </main>

      <Footer />
    </div>
  );
};

export default MessagesPage;
// ConversationsList.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc
} from 'firebase/firestore';

const ConversationsList = ({ onSelectConversation }) => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Guard clause if no user is logged in
    if (!currentUser) {
      console.log('No user logged in');
      return;
    }

    // Create query to fetch conversations where current user is a participant
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('updatedAt', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      try {
        const conversationsData = [];
        
        // Process each conversation document
        for (const docSnap of querySnapshot.docs) {
          const conversationData = docSnap.data();
          
          // Find the other participant's ID (not the current user)
          const otherParticipantId = conversationData.participants.find(
            id => id !== currentUser.uid
          );

          // Get the other participant's details
          let participantData = null;
          const doctorRef = doc(db, 'doctor_data', otherParticipantId);
          const userRef = doc(db, 'user_data', otherParticipantId);

          // Try to get doctor data first, then user data
          const doctorSnap = await getDoc(doctorRef);
          if (doctorSnap.exists()) {
            participantData = doctorSnap.data();
            participantData.type = 'doctor';
          } else {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              participantData = userSnap.data();
              participantData.type = 'patient';
            }
          }

          if (participantData) {
            conversationsData.push({
              id: docSnap.id,
              ...conversationData,
              otherParticipant: {
                id: otherParticipantId,
                name: participantData.name || 'Unknown User',
                type: participantData.type,
                specialization: participantData.specialization // Only for doctors
              },
              // Format the timestamp if it exists
              lastMessageTime: conversationData.updatedAt ? 
                conversationData.updatedAt.toDate().toLocaleString() : 
                'No messages yet'
            });
          }
        }
        
        console.log('Processed conversations:', conversationsData);
        setConversations(conversationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error processing conversations:', error);
        setLoading(false);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  // Render the conversations list
  return (
    <div className="divide-y divide-gray-200">
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.otherParticipant)}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">
                  {conversation.otherParticipant.name}
                  {conversation.otherParticipant.type === 'doctor' && (
                    <span className="ml-2 text-sm text-green-600">
                      {conversation.otherParticipant.specialization}
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-500">
                  {conversation.lastMessage || 'No messages yet'}
                </p>
              </div>
              <span className="text-xs text-gray-400">
                {conversation.lastMessageTime}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          No conversations yet
        </div>
      )}
    </div>
  );
};

export default ConversationsList;
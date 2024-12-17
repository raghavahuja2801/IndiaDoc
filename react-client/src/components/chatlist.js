// ConversationsList.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const ConversationsList = ({ onSelectConversation }) => {
  // State Management
  const { user } = useAuth(); // Get current user
  const [conversations, setConversations] = useState([]); // Store all conversations
  const [loading, setLoading] = useState(true); // Loading state

  // Effect to fetch and listen to conversations
  useEffect(() => {
    if (!user) return;

    // Create query to get all conversations for current user
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid), // Find conversations where user is participant
      orderBy('updatedAt', 'desc') // Sort by most recent
    );

    // Listen for real-time updates to conversations
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const conversationsData = [];
      
      // Process each conversation
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        // Find the ID of the other participant
        const otherParticipantId = data.participants.find(id => id !== user.uid);
        
        // Try to get participant details from both user and doctor collections
        const userDoc = await db.collection('user_data').doc(otherParticipantId).get();
        const doctorDoc = await db.collection('doctor_data').doc(otherParticipantId).get();
        
        // Get the participant's data from whichever collection it exists in
        const participantData = userDoc.exists ? userDoc.data() : doctorDoc.data();

        // Add conversation to array with participant details
        conversationsData.push({
          id: doc.id,
          ...data,
          otherParticipant: {
            id: otherParticipantId,
            name: participantData?.name || 'Unknown User',
            type: userDoc.exists ? 'patient' : 'doctor'
          }
        });
      }
      
      // Update state
      setConversations(conversationsData);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]);

  // Show loading state
  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  // Render conversations list
  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.otherParticipant)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-900">
                {conversation.otherParticipant.name}
              </h4>
              <p className="text-sm text-gray-500">
                {conversation.lastMessage || 'No messages yet'}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {conversation.updatedAt?.toDate().toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
      {conversations.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No conversations yet
        </div>
      )}
    </div>
  );
};

export default ConversationsList;
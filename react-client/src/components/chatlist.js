import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';

const ConversationsList = ({ onSelectConversation }) => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const conversationsData = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const otherParticipantId = data.participants.find(id => id !== currentUser.uid);

        const userRef = doc(db, 'user_data', otherParticipantId);
        const doctorRef = doc(db, 'doctor_data', otherParticipantId);

        const userDoc = await getDoc(userRef);
        const doctorDoc = await getDoc(doctorRef);

        const participantData = userDoc.exists()
          ? { ...userDoc.data(), type: 'patient' }
          : doctorDoc.exists()
          ? { ...doctorDoc.data(), type: 'doctor' }
          : { name: 'Unknown User', type: 'unknown' };

        conversationsData.push({
          id: docSnap.id,
          ...data,
          otherParticipant: {
            id: otherParticipantId,
            name: participantData.name,
            type: participantData.type
          }
        });
      }

      setConversations(conversationsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  return (
    <div>
      {conversations.map((conversation) => (
        <div key={conversation.id}>
          <div className="conversation-item">
            <h4>{conversation.title}</h4>
            <span>
              {
                // Check if updatedAt exists and is not null before calling toDate
                conversation.updatedAt ? conversation.updatedAt.toDate().toLocaleString() : 'No updates yet'
              }
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationsList;

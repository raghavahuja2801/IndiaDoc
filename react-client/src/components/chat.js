import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';

const ChatWindow = ({ recipientId, recipientName }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create or fetch conversation
  //Ensures a conversation exists between the logged-in user and the recipient. 
  useEffect(() => {
    const getConversation = async () => {
      // Queries Firestore for a conversation that includes both the current user and the recipient.
      const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        let existingConversation = null;
        querySnapshot.forEach((doc) => {
          if (doc.data().participants.includes(recipientId)) {
            existingConversation = doc.id;
          }
        });

        if (existingConversation) {
         //If a conversation exists with the recipient, its ID is stored in conversationId
          setConversationId(existingConversation);
        } else {
          // Create new conversation if not found
          const newConversation = await addDoc(collection(db, 'conversations'), {
            participants: [currentUser.uid, recipientId],
            createdAt: serverTimestamp(),
            lastMessage: '',
            updatedAt: serverTimestamp(),
          });
          setConversationId(newConversation.id);
        }
      });

      return () => unsubscribe();
    };

    if (currentUser && recipientId) {
      getConversation();
    }
  }, [currentUser, recipientId]);

  // Fetch messages in current conversation in REAL TIME 
  useEffect(() => {
    if (!conversationId) return;

    //Filters messages by the current conversationId and sorts them by timestamp.
    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    // Updates the messages state with the latest messages in the conversation.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        conversationId,
        sender: currentUser.uid,
        content: newMessage,
        timestamp: serverTimestamp(),
        read: false,
      });

      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessage: newMessage,
        updatedAt: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{recipientName}</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === currentUser.uid ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                message.sender === currentUser.uid
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;

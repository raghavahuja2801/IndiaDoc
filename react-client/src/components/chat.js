// ChatWindow.js
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
  // State Management
  const { user } = useAuth();  // Get current user from auth context
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(''); // Store draft message
  const [conversationId, setConversationId] = useState(null); // Store current chat ID
  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  // Function to scroll to the bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // First useEffect: Handle conversation initialization
  useEffect(() => {
    const getConversation = async () => {
      // Create a query to find existing conversation between users
      const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', user.uid)
      );

      // Listen for real-time updates to conversations
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // If conversation exists between these users, set its ID
          if (doc.data().participants.includes(recipientId)) {
            setConversationId(doc.id);
          }
        });
      });

      // If no conversation exists, create a new one
      if (!conversationId) {
        const newConversation = await addDoc(collection(db, 'conversations'), {
          participants: [user.uid, recipientId],
          createdAt: serverTimestamp(),
          lastMessage: '',
          updatedAt: serverTimestamp()
        });
        setConversationId(newConversation.id);
      }

      // Cleanup function to unsubscribe from real-time updates
      return () => unsubscribe();
    };

    // Only run if we have both user and recipient
    if (user && recipientId) {
      getConversation();
    }
  }, [user, recipientId]);

  // Second useEffect: Listen for messages in current conversation
  useEffect(() => {
    if (!conversationId) return;

    // Create query for messages in this conversation
    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    // Listen for real-time updates to messages
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messages);
    });

    // Cleanup function
    return () => unsubscribe();
  }, [conversationId]);

  // Function to handle sending new messages
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Add new message to messages collection
      await addDoc(collection(db, 'messages'), {
        conversationId,
        sender: user.uid,
        content: newMessage,
        timestamp: serverTimestamp(),
        read: false
      });

      // Update conversation with latest message
      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessage: newMessage,
        updatedAt: serverTimestamp()
      });

      // Clear input field
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Component UI Render
  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      {/* Chat Header showing recipient name */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{recipientName}</h3>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === user.uid ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                message.sender === user.uid
                  ? 'bg-green-500 text-white'  // Sent messages
                  : 'bg-gray-100 text-gray-800' // Received messages
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </div>

      {/* Message Input Form */}
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
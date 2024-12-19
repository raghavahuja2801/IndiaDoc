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
  updateDoc,
  getDocs
} from 'firebase/firestore';

const ChatWindow = ({ recipientId, recipientName }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Find or create conversation
  useEffect(() => {
    const findOrCreateConversation = async () => {
      if (!currentUser || !recipientId) return;

      try {
        // First, check for existing conversations
        const conversationsRef = collection(db, 'conversations');
        const q = query(
          conversationsRef,
          where('participants', 'array-contains', currentUser.uid)
        );
        
        const querySnapshot = await getDocs(q);
        let existingConversation = null;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.participants.includes(recipientId)) {
            existingConversation = { id: doc.id, ...data };
          }
        });

        if (existingConversation) {
          console.log('Found existing conversation:', existingConversation.id);
          setConversationId(existingConversation.id);
        } else {
          // Create new conversation
          const newConversationRef = await addDoc(conversationsRef, {
            participants: [currentUser.uid, recipientId],
            createdAt: serverTimestamp(),
            lastMessage: '',
            updatedAt: serverTimestamp()
          });
          console.log('Created new conversation:', newConversationRef.id);
          setConversationId(newConversationRef.id);
        }
      } catch (error) {
        console.error('Error finding/creating conversation:', error);
      }
    };

    findOrCreateConversation();
  }, [currentUser, recipientId]);

  // Listen for messages in current conversation
  useEffect(() => {
    if (!conversationId) return;

    console.log('Setting up messages listener for conversation:', conversationId);

    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      console.log('Retrieved messages:', messagesData);
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [conversationId]);

  // Send message function
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    try {
      console.log('Sending message in conversation:', conversationId);
      
      // Add message to messages collection
      const messageRef = await addDoc(collection(db, 'messages'), {
        conversationId,
        sender: currentUser.uid,
        content: newMessage,
        timestamp: serverTimestamp(),
        read: false
      });

      // Update conversation's last message
      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessage: newMessage,
        updatedAt: serverTimestamp()
      });

      console.log('Message sent successfully:', messageRef.id);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{recipientName}</h3>
      </div>

      {/* Messages Container */}
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
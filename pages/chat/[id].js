// pages/chat/[id].js
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useChat } from '../../contexts/ChatContext';
import { Smile, Mic, Image, Send, ArrowLeft, MoreVertical, Trash2, MessageSquare } from 'lucide-react';

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;
  const { chats, addMessage, deleteMessage } = useChat();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (!id) return;
    const chat = chats.find(c => c.id === parseInt(id));
    if (!chat) {
      router.push('/');
    }
  }, [id, chats, router]);

  const chat = chats.find(c => c.id === parseInt(id));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  if (!chat) return null;

  const sendMessage = async () => {
    if (input.trim() && chat) {
      addMessage(chat.id, { text: input, sender: 'user', timestamp: new Date().toISOString() });
      setInput('');
      setIsTyping(true);
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input, character: chat.character }),
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const data = await response.json();
        setTimeout(() => {
          setIsTyping(false);
          addMessage(chat.id, { text: data.response, sender: 'bot', timestamp: new Date().toISOString() });
        }, 1500);
      } catch (error) {
        console.error('Error:', error);
        setIsTyping(false);
        addMessage(chat.id, { text: 'Sorry, an error occurred.', sender: 'bot', timestamp: new Date().toISOString() });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🤔', '😎', '🙌'];

  const handleMessageLongPress = (message) => {
    setSelectedMessage(message);
  };

  const handleMessageOptionClick = (option) => {
    if (option === 'delete') {
      deleteMessage(chat.id, selectedMessage);
    } else if (option === 'reply') {
      // Implement reply functionality
      setInput(`Replying to: "${selectedMessage.text.slice(0, 20)}..."\n`);
    }
    setSelectedMessage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-gray-100"
    >
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-white mr-4">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center font-bold mr-3">
              {chat.character[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold">{chat.character}</h1>
              {isTyping && <p className="text-xs">מקליד...</p>}
            </div>
          </div>
        </div>
        <MoreVertical size={24} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            onContextMenu={(e) => {
              e.preventDefault();
              handleMessageLongPress(msg);
            }}
          >
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
              msg.sender === 'user' ? 'bg-green-500 text-white' : 'bg-white'
            }`}>
              {msg.text}
              <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-green-200' : 'text-gray-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString()}
                {msg.sender === 'user' && <span className="ml-2">✓✓</span>}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {selectedMessage && (
        <div className="absolute bottom-20 left-0 right-0 bg-white p-4 shadow-lg">
          <button onClick={() => handleMessageOptionClick('delete')} className="mr-4">
            <Trash2 size={20} /> Delete
          </button>
          <button onClick={() => handleMessageOptionClick('reply')}>
            <MessageSquare size={20} /> Reply
          </button>
        </div>
      )}
      {showEmojis && (
        <div className="flex justify-center p-2 bg-white border-t">
          {emojis.map(emoji => (
            <button 
              key={emoji} 
              onClick={() => setInput(prev => prev + emoji)}
              className="mx-1 text-2xl"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center">
          <button onClick={() => setShowEmojis(!showEmojis)} className="text-gray-500 mr-2">
            <Smile size={24} />
          </button>
          <button className="text-gray-500 mr-2">
            <Image size={24} />
          </button>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onkeypress={handleKeyPress}
            className="flex-1 p-2 border rounded-full"
            placeholder="הקלד הודעה..."
          />
          {input ? (
            <button onClick={sendMessage} className="text-green-500 ml-2">
              <Send size={24} />
            </button>
          ) : (
            <button className="text-gray-500 ml-2">
              <Mic size={24} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
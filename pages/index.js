import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Menu } from 'lucide-react';
import Link from 'next/link';
import NewChatModal from '../components/NewChatModal';
import { useChat } from '../contexts/ChatContext';

const Home = () => {
  const { chats, addChat, deleteChat, isDarkMode, toggleSideMenu } = useChat();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const handleOpenModal = () => setIsNewChatModalOpen(true);
  const handleCloseModal = () => setIsNewChatModalOpen(false);

  const handleAddChat = (character) => {
    addChat(character);
    handleCloseModal();
  };

  return (
    <motion.div
      className={`flex flex-col h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
    >
      <NewChatModal
        isOpen={isNewChatModalOpen}
        closeModal={handleCloseModal}
        addChat={handleAddChat}
      />
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-green-600'} text-white p-4 flex justify-between items-center`}>
        <button onClick={handleOpenModal}>
          <Plus size={24} />
        </button>
        <h1 className="text-2xl font-bold">הצ'אטים שלי</h1>
        <button onClick={toggleSideMenu}>
          <Menu size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}>
            <div className="bg-white shadow rounded-lg p-4 mb-4 cursor-pointer">
              <h2 className="text-xl font-bold">צ'אט עם {chat.character}</h2>
              <p>מספר הודעות: {chat.messages.length}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteChat(chat.id);
                }}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                מחק צ'אט
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <p>Number of chats: {chats.length}</p>
      </div>
    </motion.div>
  );
};

export default Home;
import React from 'react';
import { motion } from 'framer-motion';
import { X, Settings, User, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useChat } from '../contexts/ChatContext';

const SideMenu = () => {
  const { isSideMenuOpen, toggleSideMenu, isDarkMode, toggleDarkMode } = useChat();

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: isSideMenuOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 h-full w-64 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg z-50`}
    >
      <button onClick={toggleSideMenu} className="absolute top-4 right-4 text-gray-500">
        <X size={24} />
      </button>
      <div className="p-4 mt-12">
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>תפריט</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/profile" className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <User size={20} className="mr-2" /> פרופיל
            </Link>
          </li>
          <li>
            <Link href="/settings" className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <Settings size={20} className="mr-2" /> הגדרות
            </Link>
          </li>
          <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <button onClick={toggleDarkMode} className="flex items-center">
              {isDarkMode ? <Sun size={20} className="mr-2" /> : <Moon size={20} className="mr-2" />}
              {isDarkMode ? 'מצב בהיר' : 'מצב כהה'}
            </button>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SideMenu;
// pages/settings.js
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';

const Settings = () => {
    const { user } = useAuth();
    const { isDarkMode, toggleDarkMode } = useChat();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">הגדרות</h1>
      <p>כאן תוכל לשנות את הגדרות האפליקציה.</p>
      {/* כאן תוכל להוסיף אפשרויות הגדרה שונות */}
      <Link href="/" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded">
        חזרה לדף הבית
      </Link>
    </div>
  );
};

export default Settings;
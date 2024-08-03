import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  const addChat = useCallback((character) => {
    const newChat = {
      id: Date.now(),
      character,
      messages: []
    };
    setChats(prevChats => [...prevChats, newChat]);
    return newChat.id;
  }, []);

  const addMessage = useCallback((chatId, message) => {
    setChats(prevChats => prevChats.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, message] }
        : chat
    ));
  }, []);

  const deleteChat = useCallback((id) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', String(newMode));
      return newMode;
    });
  }, []);

  const toggleSideMenu = useCallback(() => {
    setIsSideMenuOpen(prev => !prev);
  }, []);

  return (
    <ChatContext.Provider value={{ 
      chats, 
      addChat, 
      addMessage, 
      deleteChat, 
      isDarkMode, 
      toggleDarkMode,
      isSideMenuOpen,
      toggleSideMenu
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
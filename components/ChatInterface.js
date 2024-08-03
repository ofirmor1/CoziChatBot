import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import CharacterSelect from './CharacterSelect';

const characterTitles = {
  "כועס": "צ'אט עם חבר כעסן",
  "מאושר": "צ'אט עם חבר מאושר",
  "יועץ": "צ'אט עם יועץ מנוסה",
  "פסיכולוג": "צ'אט עם פסיכולוג",
  "מתוחכם": "צ'אט עם חבר מתוחכם",
  "סקרן": "צ'אט עם חבר סקרן",
  "ספקן": "צ'אט עם חבר ספקן",
  "אופטימי": "צ'אט עם חבר אופטימי",
  "פסימי": "צ'אט עם חבר פסימי",
  "חרוץ": "צ'אט עם חבר חרוץ",
  "חייזר": "צ'אט עם חייזר סקרן"
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [character, setCharacter] = useState('כועס');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, character }),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
    
      const data = await response.json();
      if (data.response) {
        const botMessage = { role: 'bot', content: data.response };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'bot', content: `שגיאה: ${error.message}` };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{characterTitles[character]}</h1>
        <Menu size={24} />
      </div>
      <MessageList messages={messages} />
      <div className="p-4 bg-gray-200">
        <CharacterSelect character={character} setCharacter={setCharacter} />
        <MessageInput input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
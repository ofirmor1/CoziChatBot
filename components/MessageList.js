// components/MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${message.role === 'user' ? 'bg-green-500 text-white' : 'bg-white'}`}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
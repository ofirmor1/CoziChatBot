// components/MessageInput.js
import React from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ input, setInput, sendMessage }) => {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded"
      />
      <button onClick={sendMessage} className="bg-green-500 text-white p-2 rounded">
        <Send size={20} />
      </button>
    </div>
  );
};

export default MessageInput;
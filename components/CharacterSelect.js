// components/CharacterSelect.js
import React from 'react';

const characters = {
  "כעסן": "Angry",
  "מאושר": "Happy",
  "יועץ": "Advisor",
  "פסיכולוג": "Psychologist",
  "מתוחכם": "Sophisticated",
  "סקרן": "Curious",
  "ספקן": "Skeptic",
  "אופטימי": "Optimistic",
  "פסימי": "Pessimistic",
  "חרוץ": "Diligent",
  "חייזר": "Alien"
};

const CharacterSelect = ({ character, setCharacter }) => {
  return (
    <select 
      value={character} 
      onChange={(e) => setCharacter(e.target.value)} 
      className="mb-2 p-2 border rounded"
    >
      {Object.entries(characters).map(([key, value]) => (
        <option key={key} value={key}>{value}</option>
      ))}
    </select>
  );
};

export default CharacterSelect;
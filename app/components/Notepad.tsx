"use client";
import React, { useState } from 'react';

const Notepad = () => {
  const [notes, setNotes] = useState('');

  return (
    <div className="relative w-64 h-96"> {/* Adjust width/height as needed */}
      <div className="absolute top-0 left-0 w-full h-full transform rotate-2 bg-yellow-100 shadow-lg"></div>
      <div className="absolute top-0 left-0 w-full h-full transform -rotate-1 bg-yellow-50 shadow-lg"></div>
      <div className="relative w-full h-full bg-yellow-50 shadow-lg p-4 flex flex-col">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-full bg-transparent resize-none focus:outline-none leading-relaxed"
          style={{
            fontFamily: "'Indie Flower', cursive",
            fontSize: '1.1rem',
            lineHeight: '1.75rem',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #666 28px)',
            backgroundPosition: '0 5px',
            backgroundSize: '100% 28px',
          }}
        />
      </div>
    </div>
  );
};

export default Notepad; 
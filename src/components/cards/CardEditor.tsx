import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../types/Card';
import { saveCards, getCards } from '../../services/storage';

const CardEditor: React.FC = () => {
  const [sideAContent, setSideAContent] = useState('');
  const [sideBContent, setSideBContent] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (!sideAContent || !sideBContent) {
      alert('Both sides of the card must have content');
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      deckId: '',
      sideA: {
        elements: [
          {
            id: 'text-a',
            type: 'text',
            content: sideAContent,
            style: {},
            position: { x: 0, y: 0, width: 200, height: 100 }
          }
        ]
      },
      sideB: {
        elements: [
          {
            id: 'text-b',
            type: 'text',
            content: sideBContent,
            style: {},
            position: { x: 0, y: 0, width: 200, height: 100 }
          }
        ]
      }
    };

    const existingCards = getCards();
    saveCards([...existingCards, newCard]);
    navigate('/');
  };

  return (
    <div className="card-editor">
      <h2>Create New Card</h2>
      <div>
        <h3>Side A</h3>
        <textarea
          value={sideAContent}
          onChange={(e) => setSideAContent(e.target.value)}
          placeholder="Enter content for Side A"
        />
      </div>
      <div>
        <h3>Side B</h3>
        <textarea
          value={sideBContent}
          onChange={(e) => setSideBContent(e.target.value)}
          placeholder="Enter content for Side B"
        />
      </div>
      <button onClick={handleSave}>Save Card</button>
    </div>
  );
};

export default CardEditor;
import React, { useState } from 'react';
import { Card } from '../../types/Card';

interface CardEditorProps {
  cardId: string | null;
  onSave: (card: Card) => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ cardId, onSave }) => {
  const [sideAContent, setSideAContent] = useState('');
  const [sideBContent, setSideBContent] = useState('');

  const handleSave = () => {
    const newCard: Card = {
      id: cardId || Date.now().toString(),
      deckId: '', // This should be set when adding to a deck
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
    onSave(newCard);
  };

  return (
    <div className="card-editor">
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

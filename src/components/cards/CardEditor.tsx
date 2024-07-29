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
    <div style={styles.cardEditor}>
      <h2>Create New Card</h2>
      <div style={styles.canvas}>
        <div style={styles.side}>
          <h3>Side A</h3>
          <textarea
            value={sideAContent}
            onChange={(e) => setSideAContent(e.target.value)}
            placeholder="Enter content for Side A"
            style={styles.textarea}
          />
        </div>
        <div style={styles.side}>
          <h3>Side B</h3>
          <textarea
            value={sideBContent}
            onChange={(e) => setSideBContent(e.target.value)}
            placeholder="Enter content for Side B"
            style={styles.textarea}
          />
        </div>
      </div>
      <button onClick={handleSave} style={styles.saveButton}>Save Card</button>
    </div>
  );
};

const styles = {
  cardEditor: {
    padding: '20px',
  },
  canvas: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  side: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    margin: '10px',
  },
  textarea: {
    width: '100%',
    height: '200px',
  },
  saveButton: {
    marginTop: '20px',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default CardEditor;

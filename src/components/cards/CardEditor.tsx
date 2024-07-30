import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardElement } from '../../types/Card';
import { saveCards, getCards } from '../../services/storage';
import useUndoRedo from '../../hooks/useUndoRedo';
import SideEditor from './SideEditor';

const CardEditor: React.FC = () => {
  const { state: sideAContent, set: setSideAContent, undo: undoA, redo: redoA } = useUndoRedo<CardElement[]>([]);
  const { state: sideBContent, set: setSideBContent, undo: undoB, redo: redoB } = useUndoRedo<CardElement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContentChange = (side: 'A' | 'B', content: string) => {
    const setContent = side === 'A' ? setSideAContent : setSideBContent;
    setContent(prevContent => 
      prevContent.map(element => 
        element.type === 'text' ? { ...element, content } : element
      )
    );
  };

  const handleSave = () => {
    try {
      if (!sideAContent.length || !sideBContent.length) {
        throw new Error('Both sides of the card must have content');
      }

      const newCard: Card = {
        id: Date.now().toString(),
        deckId: '',
        sideA: { elements: sideAContent },
        sideB: { elements: sideBContent },
      };

      const existingCards = getCards();
      saveCards(Array.isArray(existingCards) ? [...existingCards, newCard] : [newCard]);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleUndo = (side: 'A' | 'B') => {
    side === 'A' ? undoA() : undoB();
  };

  const handleRedo = (side: 'A' | 'B') => {
    side === 'A' ? redoA() : redoB();
  };

  return (
    <div style={styles.cardEditor}>
      <h2>Create New Card</h2>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.canvas}>
        <SideEditor
          side="A"
          content={sideAContent}
          setContent={setSideAContent}
          undo={() => handleUndo('A')}
          redo={() => handleRedo('A')}
          onContentChange={(content) => handleContentChange('A', content)}
        />
        <SideEditor
          side="B"
          content={sideBContent}
          setContent={setSideBContent}
          undo={() => handleUndo('B')}
          redo={() => handleRedo('B')}
          onContentChange={(content) => handleContentChange('B', content)}
        />
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
  saveButton: {
    marginTop: '20px',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default CardEditor;
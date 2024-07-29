import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardElement } from '../../types/Card';
import { saveCards, getCards } from '../../services/storage';
import useUndoRedo from '../../hooks/useUndoRedo';
import SideEditor from './SideEditor';

const CardEditor: React.FC = () => {
  const { state: sideAContent, set: setSideAContent, undo: undoA, redo: redoA } = useUndoRedo<CardElement[]>([]);
  const { state: sideBContent, set: setSideBContent, undo: undoB, redo: redoB } = useUndoRedo<CardElement[]>([]);
  const navigate = useNavigate();

  const handleSave = () => {
    if (!sideAContent.length || !sideBContent.length) {
      alert('Both sides of the card must have content');
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      deckId: '',
      sideA: { elements: sideAContent },
      sideB: { elements: sideBContent },
    };

    const existingCards = getCards();
    saveCards([...existingCards, newCard]);
    navigate('/');
  };

  return (
    <div style={styles.cardEditor}>
      <h2>Create New Card</h2>
      <div style={styles.canvas}>
        <SideEditor side="A" content={sideAContent} setContent={setSideAContent} undo={undoA} redo={redoA} />
        <SideEditor side="B" content={sideBContent} setContent={setSideBContent} undo={undoB} redo={redoB} />
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
};

export default CardEditor;

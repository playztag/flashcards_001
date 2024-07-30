import React, { useState, useEffect } from 'react';
import { Deck } from '../../types/Deck';
import { saveDecks, getDecks } from '../../services/storage';
import DeckList from './DeckList';

const DeckManager: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDescription, setNewDeckDescription] = useState('');

  useEffect(() => {
    setDecks(getDecks());
  }, []);

  const createDeck = () => {
    if (newDeckName.trim() === '') {
      alert('Deck name cannot be empty');
      return;
    }

    const newDeck: Deck = {
      id: Date.now().toString(),
      name: newDeckName,
      description: newDeckDescription,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
    saveDecks(updatedDecks);
    setNewDeckName('');
    setNewDeckDescription('');
  };

  return (
    <div>
      <h2>Deck Manager</h2>
      <div>
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="Enter deck name"
        />
        <input
          type="text"
          value={newDeckDescription}
          onChange={(e) => setNewDeckDescription(e.target.value)}
          placeholder="Enter deck description"
        />
        <button onClick={createDeck}>Create New Deck</button>
      </div>
      <DeckList decks={decks} />
    </div>
  );
};

export default DeckManager;

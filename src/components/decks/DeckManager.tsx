import React, { useState } from 'react';
import { Deck } from '../../types/Deck';

const DeckManager: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  const createDeck = (name: string, description: string) => {
    const newDeck: Deck = {
      id: Date.now().toString(),
      name,
      description,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDecks([...decks, newDeck]);
  };

  return (
    <div>
      <h2>Deck Manager</h2>
      <button onClick={() => createDeck('New Deck', 'A new deck')}>
        Create New Deck
      </button>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>{deck.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeckManager;

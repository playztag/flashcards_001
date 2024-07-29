import React, { useState } from 'react';
import { Deck } from '../../types/Deck';
import { saveDecks, getDecks } from '../../services/storage';

const DeckManager: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>(getDecks());

  const createDeck = (name: string, description: string) => {
    const newDeck: Deck = {
      id: Date.now().toString(),
      name,
      description,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
    saveDecks(updatedDecks);
  };

  const exportDecks = (decks: Deck[]): void => {
    const dataStr = JSON.stringify(decks);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'decks.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importDecks = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target?.result as string;
      const importedDecks: Deck[] = JSON.parse(content);
      saveDecks(importedDecks);
      setDecks(importedDecks);
    };
    if (event.target.files?.[0]) {
      fileReader.readAsText(event.target.files[0]);
    }
  };

  return (
    <div>
      <h2>Deck Manager</h2>
      <button onClick={() => createDeck('New Deck', 'Description')}>Create New Deck</button>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>{deck.name}</li>
        ))}
      </ul>
      <button onClick={() => exportDecks(decks)}>Export Decks</button>
      <input type="file" onChange={importDecks} />
    </div>
  );
};

export default DeckManager;

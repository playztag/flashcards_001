import React from 'react';
import { Deck } from '../../types/Deck';

interface DeckItemProps {
  deck: Deck;
}

const DeckItem: React.FC<DeckItemProps> = ({ deck }) => {
  return (
    <li>
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <p>Cards: {deck.cards.length}</p>
    </li>
  );
};

export default DeckItem;

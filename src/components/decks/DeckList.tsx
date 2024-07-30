import React from 'react';
import { Deck } from '../../types/Deck';
import DeckItem from './DeckItem';

interface DeckListProps {
  decks: Deck[];
}

const DeckList: React.FC<DeckListProps> = ({ decks }) => {
  return (
    <ul>
      {decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </ul>
  );
};

export default DeckList;

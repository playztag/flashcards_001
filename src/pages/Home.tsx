// src/pages/Home.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCards } from '../services/storage';
import { Card } from '../types/Card';

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchedCards = getCards();
    setCards(fetchedCards);
  }, []);

  const getCardTitle = (card: Card) => {
    const textElement = card.elements.find(element => element.type === 'text');
    return textElement?.content || 'Untitled Card';
  };

  return (
    <div>
      <h1>Flash Cards</h1>
      {cards.length === 0 ? (
        <p>No cards yet. <Link to="/editor">Create your first card!</Link></p>
      ) : (
        <ul>
          {cards.map(card => (
            <li key={card.id}>
              <Link to={`/editor/${card.id}`}>
                {getCardTitle(card)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/editor">Create New Card</Link>
    </div>
  );
};

export default Home;
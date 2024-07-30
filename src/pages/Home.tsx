// src/pages/Home.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCards } from '../services/storage';
import { Card, CardElement } from '../types/Card';

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const fetchedCards = getCards();
      setCards(fetchedCards);
    } catch (err) {
      setError('Failed to load cards. Please try again later.');
      console.error('Error fetching cards:', err);
    }
  }, []);

  const getCardTitle = (card: Card): string => {
    if (Array.isArray(card.elements)) {
      const textElement = card.elements.find((element: CardElement) => element.type === 'text');
      return textElement?.content || 'Untitled Card';
    } else {
      return 'Untitled Card';
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Flash Cards</h1>
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
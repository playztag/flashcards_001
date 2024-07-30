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
                {card.sideA.elements[0]?.content || 'Untitled Card'}
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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCards } from '../services/storage';
import { Card } from '../types/Card';

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchedCards = getCards();
    setCards(fetchedCards || []);
  }, []);

  return (
    <div>
      <h1>Flash Card Creator</h1>
      <Link to="/editor">Create New Card</Link>
      <h2>Existing Cards:</h2>
      <ul>
        {cards?.map((card) => (
          <li key={card.id}>
            {card.sideA.elements[0]?.content} - {card.sideB.elements[0]?.content}
          </li>
        )) || <li>No cards available</li>}
      </ul>
    </div>
  );
};

export default Home;
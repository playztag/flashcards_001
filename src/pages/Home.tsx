import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCards } from '../services/storage';
import { Card } from '../types/Card';

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    console.log('Home: Component mounted');
    const fetchedCards = getCards();
    console.log('Home: Fetched cards', fetchedCards);
    setCards(fetchedCards);
  }, []);

  console.log('Home: Rendering');

  return (
    <div>
      <h2>Your Flash Cards</h2>
      <p style={{ color: 'red' }}>Debug: Home component rendered. Card count: {cards.length}</p>
      {cards.length === 0 ? (
        <p>You don't have any cards yet. <Link to="/editor">Create your first card!</Link></p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <strong>Front:</strong> {card.sideA.elements[0]?.content}
              <br />
              <strong>Back:</strong> {card.sideB.elements[0]?.content}
            </li>
          ))}
        </ul>
      )}
      <Link to="/editor">Create New Card</Link>
    </div>
  );
};

export default Home;
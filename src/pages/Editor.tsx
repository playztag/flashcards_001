import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardEditor from '../components/cards/CardEditor';
import { Card } from '../types/Card';
import { getCard, saveCard } from '../services/storage';

const Editor: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();

  const card = cardId ? getCard(cardId) : undefined;

  const handleSave = (updatedCard: Card) => {
    saveCard(updatedCard);
    navigate('/');
  };

  return (
    <div>
      <h1>{cardId ? 'Edit Card' : 'Create New Card'}</h1>
      <CardEditor card={card} onSave={handleSave} />
    </div>
  );
};

export default Editor;
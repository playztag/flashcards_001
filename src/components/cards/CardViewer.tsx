// src/components/cards/CardViewer.tsx

import React, { useState } from 'react';
import { Card, CardElement } from '../../types/Card';

interface CardViewerProps {
  card: Card;
}

const CardViewer: React.FC<CardViewerProps> = ({ card }) => {
  const [showFront, setShowFront] = useState(true);

  const flipCard = () => {
    setShowFront(!showFront);
  };

  const renderElement = (element: CardElement) => {
    switch (element.type) {
      case 'text':
        return <div key={element.id}>{element.content}</div>;
      case 'rectangle':
        return <div key={element.id} style={{ 
          width: element.position.width, 
          height: element.position.height, 
          backgroundColor: element.style.fill 
        }}></div>;
      case 'circle':
        return <div key={element.id} style={{ 
          width: element.position.width, 
          height: element.position.height, 
          borderRadius: '50%', 
          backgroundColor: element.style.fill 
        }}></div>;
      default:
        return null;
    }
  };

  return (
    <div className="card-viewer" onClick={flipCard}>
      <h2>Card Viewer</h2>
      <div>
        <h3>{showFront ? 'Front' : 'Back'}</h3>
        {card.elements.map(renderElement)}
      </div>
    </div>
  );
};

export default CardViewer;
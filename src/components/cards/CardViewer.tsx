import React, { useState } from 'react';
import { Card } from '../../types/Card';

interface CardViewerProps {
  card: Card;
}

const CardViewer: React.FC<CardViewerProps> = ({ card }) => {
  const [showFront, setShowFront] = useState(true);

  const flipCard = () => {
    setShowFront(!showFront);
  };

  return (
    <div className="card-viewer" onClick={flipCard}>
      <h2>Card Viewer</h2>
      {showFront ? (
        <div>
          <h3>Front</h3>
          {card.sideA.elements.map((element) => (
            <div key={element.id}>{element.content}</div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Back</h3>
          {card.sideB.elements.map((element) => (
            <div key={element.id}>{element.content}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardViewer;

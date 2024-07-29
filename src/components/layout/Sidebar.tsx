import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.deckTitle}>Current Deck: Physics</h2>
      <p style={styles.cardCount}>Cards: 15</p>
      <div style={styles.cardList}>
        <p>Card 1: Newton's First Law</p>
        <p>Card 2: F = ma</p>
        <p>Card 3: Energy Conservation</p>
        {/* Add more cards as necessary */}
      </div>
      <Link to="/editor">
        <button style={styles.newCardButton}>Create New Card</button>
      </Link>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#e0e0e0',
    padding: '10px',
    height: '100vh',
  },
  deckTitle: {
    fontSize: '18px',
    color: '#333',
  },
  cardCount: {
    fontSize: '16px',
    color: '#666',
  },
  cardList: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    marginTop: '10px',
    overflowY: 'auto' as 'auto', // Fix type error
    height: 'calc(100% - 180px)',
  },
  newCardButton: {
    width: '100%',
    height: '40px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Sidebar;

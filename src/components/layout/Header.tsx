import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Flash Card Creator</h1>
      <div style={styles.navigation}>
        <a href="/" style={styles.navLink}>Home</a>
        <a href="/editor" style={styles.navLink}>Create New Card</a>
        <a href="/decks" style={styles.navLink}>Manage Decks</a>
      </div>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    height: '60px',
    backgroundColor: '#4a90e2',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    color: 'white'
  },
  title: {
    fontSize: '24px',
  },
  navigation: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
  },
};

export default Header;

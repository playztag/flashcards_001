import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>App Information</p>
      <p style={styles.footerText}>Links</p>
    </footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    height: '40px',
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    color: 'white'
  },
  footerText: {
    fontSize: '14px',
  },
};

export default Footer;

import React, { useEffect } from 'react';

const DeckManagement: React.FC = () => {
  useEffect(() => {
    console.log('DeckManagement: Component mounted');
  }, []);

  console.log('DeckManagement: Rendering');

  return (
    <div>
      <h1>DeckManagement</h1>
      <p style={{ color: 'red' }}>Debug: DeckManagement component rendered</p>
      {/* TODO: Implement DeckManagement page */}
    </div>
  );
};

export default DeckManagement;
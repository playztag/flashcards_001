import React, { useEffect } from 'react';
import CardEditor from '../components/cards/CardEditor';

const Editor: React.FC = () => {
  useEffect(() => {
    console.log('Editor: Component mounted');
  }, []);

  console.log('Editor: Rendering');

  return (
    <div>
      <h1>Editor</h1>
      <CardEditor />
      <p style={{ color: 'red' }}>Debug: Editor component rendered</p>
    </div>
  );
};

export default Editor;

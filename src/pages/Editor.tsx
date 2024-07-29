import React, { useEffect } from 'react';

const Editor: React.FC = () => {
  useEffect(() => {
    console.log('Editor: Component mounted');
  }, []);

  console.log('Editor: Rendering');

  return (
    <div>
      <h1>Editor</h1>
      <p style={{ color: 'red' }}>Debug: Editor component rendered</p>
      {/* TODO: Implement Editor page */}
    </div>
  );
};

export default Editor;
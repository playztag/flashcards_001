import React from 'react';
import { CardElement } from '../../types/Card';
import ElementEditor from './ElementEditor'; 

interface SideEditorProps {
  side: 'A' | 'B';
  content: CardElement[];
  setContent: React.Dispatch<React.SetStateAction<CardElement[]>>;
  undo: () => void;
  redo: () => void;
  onContentChange: (content: string) => void;
}

const SideEditor: React.FC<SideEditorProps> = ({ side, content, setContent, undo, redo, onContentChange }) => {
  const addElement = (type: 'text' | 'rectangle' | 'circle') => {
    const newElement: CardElement = {
      id: Date.now().toString(),
      type,
      content: '',
      style: {},
      position: { x: 0, y: 0, width: 100, height: 100 },
      side: side  // Add this line
    };
    setContent([...content, newElement]);
  };

  const updateElement = (id: string, updatedElement: CardElement) => {
    setContent(content.map(el => (el.id === id ? updatedElement : el)));
  };

  const deleteElement = (id: string) => {
    setContent(content.filter(el => el.id !== id));
  };

  return (
    <div style={styles.side}>
      <h3>Side {side}</h3>
      {content.map(el => (
        <ElementEditor
          key={el.id}
          element={el}
          updateElement={updateElement}
          deleteElement={deleteElement}
          onContentChange={onContentChange}
        />
      ))}
      <button onClick={() => addElement('text')}>Add Text</button>
      <button onClick={() => addElement('rectangle')}>Add Rectangle</button>
      <button onClick={() => addElement('circle')}>Add Circle</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

const styles = {
  side: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    margin: '10px',
  },
};

export default SideEditor;
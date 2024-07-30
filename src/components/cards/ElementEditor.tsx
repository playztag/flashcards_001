import React, { useState } from 'react';
import { CardElement } from '../../types/Card';

interface ElementEditorProps {
  element: CardElement;
  updateElement: (id: string, updatedElement: CardElement) => void;
  deleteElement: (id: string) => void;
  onContentChange: (content: string) => void;
}

const ElementEditor: React.FC<ElementEditorProps> = ({ element, updateElement, deleteElement, onContentChange }) => {
  const [content, setContent] = useState(element.content);
  const [style, setStyle] = useState(element.style);
  const [position, setPosition] = useState(element.position);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange(newContent);
  };

  const handleSave = () => {
    const updatedElement = { ...element, content, style, position };
    updateElement(element.id, updatedElement);
  };

  return (
    <div style={styles.elementEditor}>
      {element.type === 'text' && (
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Enter text"
          style={styles.textarea}
        />
      )}
      <button onClick={handleSave}>Save</button>
      <button onClick={() => deleteElement(element.id)}>Delete</button>
    </div>
  );
};

const styles = {
  elementEditor: {
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '100px',
  },
};

export default ElementEditor;
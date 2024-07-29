import { useState, useCallback } from 'react';
import { Shape } from '../types/Shape';

const useCanvas = (initialShapes: Shape[] = []) => {
  const [shapes, setShapes] = useState<Shape[]>(initialShapes);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const addShape = (shape: Shape) => {
    setShapes([...shapes, shape]);
  };

  const updateShape = (id: string, newShape: Shape) => {
    setShapes(shapes.map(shape => (shape.id === id ? newShape : shape)));
  };

  const deleteShape = (id: string) => {
    setShapes(shapes.filter(shape => shape.id !== id));
  };

  const selectShape = (id: string) => {
    setSelectedShape(shapes.find(shape => shape.id === id) || null);
  };

  return {
    shapes,
    selectedShape,
    addShape,
    updateShape,
    deleteShape,
    selectShape,
  };
};

export default useCanvas;

import { useState, useCallback } from 'react';
import { CardElement } from '../types/Card';

const useElement = (initialElements: CardElement[] = []) => {
  const [elements, setElements] = useState<CardElement[]>(initialElements);

  const addElement = (element: CardElement) => {
    setElements([...elements, element]);
  };

  const updateElement = (id: string, newElement: CardElement) => {
    setElements(elements.map(element => (element.id === id ? newElement : element)));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(element => element.id !== id));
  };

  return {
    elements,
    addElement,
    updateElement,
    deleteElement,
  };
};

export default useElement;

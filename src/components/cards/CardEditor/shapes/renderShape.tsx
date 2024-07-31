import React from 'react';
import { CardElement } from '../../../../types/Card';
import { RectangleShape } from './RectangleShape';
import { CircleShape } from './CircleShape';
import { EllipseShape } from './EllipseShape';
import { TextShape } from './TextShape';
import { LineShape } from './LineShape';
import { TriangleShape } from './TriangleShape';

export const renderShape = (
  element: CardElement,
  selectedId: string | null,
  selectShape: (id: string | null) => void
): React.ReactNode => {
  switch (element.type) {
    case 'rectangle':
      return <RectangleShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'circle':
      return <CircleShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'ellipse':
      return <EllipseShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'text':
      return <TextShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'line':
      return <LineShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'triangle':
      return <TriangleShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    default:
      return null;
  }
};
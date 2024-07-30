import React from 'react';
import { Rect, Circle, Text } from 'react-konva';
import { CardElement } from '../../../types/Card';
import { getShapeProps, getCircleRadius } from './CardEditorUtils';

interface ShapeProps {
  element: CardElement;
  selectedId: string | null;
  selectShape: (id: string | null) => void;
}

export const RectangleShape: React.FC<ShapeProps> = ({ element, selectedId, selectShape }) => {
  const shapeProps = getShapeProps(element, selectedId, selectShape);
  return <Rect {...shapeProps} />;
};

export const CircleShape: React.FC<ShapeProps> = ({ element, selectedId, selectShape }) => {
  const shapeProps = getShapeProps(element, selectedId, selectShape);
  const radius = getCircleRadius(shapeProps.width, shapeProps.height);
  return <Circle {...shapeProps} radius={radius} />;
};

export const TextShape: React.FC<ShapeProps> = ({ element, selectedId, selectShape }) => {
  const shapeProps = getShapeProps(element, selectedId, selectShape);
  return (
    <Text
      {...shapeProps}
      text={element.content}
      fontSize={element.style.fontSize || 16}
      fill={element.style.fill}
    />
  );
};

export const renderShape = (
  element: CardElement,
  selectedId: string | null,
  selectShape: (id: string | null) => void
) => {
  switch (element.type) {
    case 'rectangle':
      return <RectangleShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'circle':
      return <CircleShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'text':
      return <TextShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    default:
      return null;
  }
};
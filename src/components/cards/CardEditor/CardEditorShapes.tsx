import React from 'react';
import { Rect, Circle, Ellipse, Text } from 'react-konva';
import { CardElement } from '../../../types/Card';
import { getShapeProps, getEllipseRadii } from './CardEditorUtils';

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
  const { radiusX, radiusY } = getEllipseRadii(element.position.width, element.position.height);
  return (
    <Circle
      {...shapeProps}
      radius={Math.max(radiusX, radiusY)}
      width={undefined}
      height={undefined}
    />
  );
};

export const EllipseShape: React.FC<ShapeProps> = ({ element, selectedId, selectShape }) => {
  const shapeProps = getShapeProps(element, selectedId, selectShape);
  const { radiusX, radiusY } = getEllipseRadii(element.position.width, element.position.height);
  return (
    <Ellipse
      {...shapeProps}
      radiusX={radiusX}
      radiusY={radiusY}
      width={undefined}
      height={undefined}
    />
  );
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
    case 'ellipse':
      return <EllipseShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    case 'text':
      return <TextShape key={element.id} element={element} selectedId={selectedId} selectShape={selectShape} />;
    default:
      return null;
  }
};
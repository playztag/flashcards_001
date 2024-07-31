import React from 'react';
import { Text } from 'react-konva';
import { ShapeProps } from './ShapeTypes';
import { getShapeProps } from '../utils';

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
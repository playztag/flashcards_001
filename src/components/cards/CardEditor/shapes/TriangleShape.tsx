import React from 'react';
import { Line } from 'react-konva';
import { ShapeProps } from './ShapeTypes';
import { getShapeProps } from '../utils';

export const TriangleShape: React.FC<ShapeProps> = ({ element, selectedId, selectShape }) => {
  const shapeProps = getShapeProps(element, selectedId, selectShape);
  const { width, height } = element.position;
  return (
    <Line
      {...shapeProps}
      points={[0, height, width / 2, 0, width, height]}
      closed
      fill={element.style.fill}
      stroke={element.style.stroke}
      strokeWidth={element.style.strokeWidth}
    />
  );
};
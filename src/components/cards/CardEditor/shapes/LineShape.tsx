import React from 'react';
import { Line } from 'react-konva';
import { ShapeProps } from './ShapeTypes';
import { getShapeProps } from '../utils';

export const LineShape: React.FC<ShapeProps> = ({ element, selectedId, selectShape }) => {
  const shapeProps = getShapeProps(element, selectedId, selectShape);
  return (
    <Line
      {...shapeProps}
      points={[0, 0, element.position.width, element.position.height]}
      stroke={element.style.stroke}
      strokeWidth={element.style.strokeWidth}
    />
  );
};
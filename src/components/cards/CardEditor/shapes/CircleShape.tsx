import React from 'react';
import { Circle } from 'react-konva';
import { ShapeProps } from './ShapeTypes';
import { getShapeProps, getEllipseRadii } from '../utils';

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
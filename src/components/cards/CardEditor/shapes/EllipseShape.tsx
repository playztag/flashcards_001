import React from 'react';
import { Ellipse } from 'react-konva';
import { ShapeProps } from './ShapeTypes';
import { getShapeProps, getEllipseRadii } from '../utils';

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
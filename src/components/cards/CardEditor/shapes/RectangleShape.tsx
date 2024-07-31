import React from 'react';
import { Rect } from 'react-konva';
import { ShapeProps } from './ShapeTypes';
import { getShapeProps } from '../utils';

export const RectangleShape: React.FC<ShapeProps> = ({ element, selectedId, selectShape }) => {
  const shapeProps = getShapeProps(element, selectedId, selectShape);
  return <Rect {...shapeProps} />;
};
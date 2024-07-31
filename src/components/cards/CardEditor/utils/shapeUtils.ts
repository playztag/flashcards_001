import { CardElement } from '../../../../types/Card';

export const getShapeProps = (
  element: CardElement,
  selectedId: string | null,
  selectShape: (id: string | null) => void
) => {
  return {
    id: element.id,
    x: element.position.x,
    y: element.position.y,
    width: element.position.width,
    height: element.position.height,
    fill: element.style.fill,
    stroke: element.style.stroke,
    strokeWidth: element.style.strokeWidth,
    draggable: true,
    onClick: () => selectShape(element.id),
  };
};

export const getEllipseRadii = (width: number, height: number) => {
  return {
    radiusX: Math.abs(width) / 2,
    radiusY: Math.abs(height) / 2
  };
};
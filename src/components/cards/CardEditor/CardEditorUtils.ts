import { KonvaEventObject } from 'konva/lib/Node';
import { CardElement } from '../../../types/Card';

export const handleStageMouseDown = (
  side: 'A' | 'B',
  e: KonvaEventObject<MouseEvent>,
  tool: 'select' | 'rectangle' | 'circle' | 'text',
  color: string,
  setIsDrawing: (isDrawing: boolean) => void,
  setNewShapeDef: (shapeDef: CardElement | null) => void,
  selectShape: (id: string | null) => void
) => {
  if (tool === 'select') {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  } else {
    setIsDrawing(true);
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setNewShapeDef({
        id: `${side}${Date.now()}`,
        type: tool,
        side,
        position: { x: pos.x, y: pos.y, width: 0, height: 0 },
        style: { fill: color, stroke: color, strokeWidth: 2 },
        content: tool === 'text' ? 'New Text' : '',
      });
    }
  }
};

export const handleStageMouseMove = (
  e: KonvaEventObject<MouseEvent>,
  isDrawing: boolean,
  newShapeDef: CardElement | null,
  setNewShapeDef: (shapeDef: CardElement | null) => void
) => {
  if (!isDrawing || !newShapeDef) return;
  const stage = e.target.getStage();
  const pos = stage?.getPointerPosition();
  if (pos) {
    setNewShapeDef({
      ...newShapeDef,
      position: {
        ...newShapeDef.position,
        width: pos.x - newShapeDef.position.x,
        height: pos.y - newShapeDef.position.y,
      },
    });
  }
};

export const handleStageMouseUp = (
  isDrawing: boolean,
  newShapeDef: CardElement | null,
  setIsDrawing: (isDrawing: boolean) => void,
  setNewShapeDef: (shapeDef: CardElement | null) => void,
  setElements: React.Dispatch<React.SetStateAction<CardElement[]>>
) => {
  if (isDrawing && newShapeDef) {
    setElements(prevElements => [...prevElements, newShapeDef]);
    setIsDrawing(false);
    setNewShapeDef(null);
  }
};

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

export const getCircleRadius = (width: number, height: number) => {
  return Math.max(1, Math.min(width, height) / 2);
};
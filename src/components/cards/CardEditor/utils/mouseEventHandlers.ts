import { KonvaEventObject } from 'konva/lib/Node';
import { CardElement } from '../../../../types/Card';

export const handleMouseDown = (
  side: 'A' | 'B',
  e: KonvaEventObject<MouseEvent>,
  tool: 'select' | 'rectangle' | 'circle' | 'ellipse' | 'text' | 'line' | 'triangle',
  color: string,
  setIsDrawing: (isDrawing: boolean) => void,
  setNewShapeDef: (shapeDef: CardElement | null) => void,
  selectShape: (id: string | null) => void
) => {
  const stage = e.target.getStage();
  const clickedOnEmpty = e.target === stage;
  
  if (clickedOnEmpty) {
    selectShape(null);
    if (tool !== 'select') {
      setIsDrawing(true);
      const pos = stage?.getPointerPosition();
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
  } else {
    const clickedOnTransformer = e.target.getParent()?.className === 'Transformer';
    if (!clickedOnTransformer) {
      const id = e.target.id();
      selectShape(id);
    }
  }
};

export const handleMouseMove = (
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

export const handleMouseUp = (
  side: 'A' | 'B',
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
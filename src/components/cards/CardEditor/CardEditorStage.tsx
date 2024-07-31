import React, { ReactNode } from 'react';
import { Stage, Layer } from 'react-konva';
import { CardElement } from '../../../types/Card';
import { StageContainer } from './styles';
import { renderShape } from './shapes';

interface CardEditorStageProps {
  side: 'A' | 'B';
  elements: CardElement[];
  stageRef: React.RefObject<any>;
  layerRef: React.RefObject<any>;
  selectedId: string | null;
  selectShape: (id: string | null) => void;
  isDrawing: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
  newShapeDef: CardElement | null;
  setNewShapeDef: (shapeDef: CardElement | null) => void;
  tool: 'select' | 'rectangle' | 'circle' | 'text' | 'line' | 'triangle';
  color: string;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: () => void;
  children?: ReactNode;
}

export const CardEditorStage: React.FC<CardEditorStageProps> = ({
  side,
  elements,
  stageRef,
  layerRef,
  selectedId,
  selectShape,
  isDrawing,
  newShapeDef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  children,
}) => {
  return (
    <StageContainer>
      <h3>Side {side}</h3>
      <Stage
        width={400}
        height={300}
        ref={stageRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Layer ref={layerRef}>
          {elements.map((element) => renderShape(element, selectedId, selectShape))}
          {isDrawing && newShapeDef && newShapeDef.side === side && renderShape(newShapeDef, selectedId, selectShape)}
          {children}
        </Layer>
      </Stage>
    </StageContainer>
  );
};
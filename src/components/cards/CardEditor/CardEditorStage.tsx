import React from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import { CardElement } from '../../../types/Card';
import { StageContainer } from './CardEditorStyles';
import { renderShape } from './CardEditorShapes';

interface CardEditorStageProps {
  side: 'A' | 'B';
  elements: CardElement[];
  stageRef: React.RefObject<any>;
  layerRef: React.RefObject<any>;
  transformerRef: React.RefObject<any>;
  selectedId: string | null;
  selectShape: (id: string | null) => void;
  isDrawing: boolean;
  isDragging: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
  newShapeDef: CardElement | null;
  setNewShapeDef: (shapeDef: CardElement | null) => void;
  tool: 'select' | 'rectangle' | 'circle' | 'text';
  color: string;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: () => void;
}

export const CardEditorStage: React.FC<CardEditorStageProps> = ({
  side,
  elements,
  stageRef,
  layerRef,
  transformerRef,
  selectedId,
  selectShape,
  isDrawing,
  isDragging,
  newShapeDef,
  tool,
  color,
  onMouseDown,
  onMouseMove,
  onMouseUp,
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
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </StageContainer>
  );
};
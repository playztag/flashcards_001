import React, { useState, useRef } from 'react';
import { Card, CardElement } from '../../../types/Card';
import { CardEditorToolbar } from './CardEditorToolbar';
import { CardEditorStage } from './CardEditorStage';
import { EditorContainer, EditArea, SideBySideContainer, SaveButton } from './CardEditorStyles';
import { handleStageMouseDown, handleStageMouseMove, handleStageMouseUp } from './CardEditorUtils';

interface CardEditorProps {
  card?: Card;
  onSave: (card: Card) => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ card, onSave }) => {
  const [sideAElements, setSideAElements] = useState<CardElement[]>(() => {
    return card?.elements?.filter(el => el.side === 'A') || [];
  });
  const [sideBElements, setSideBElements] = useState<CardElement[]>(() => {
    return card?.elements?.filter(el => el.side === 'B') || [];
  });
  const [selectedId, selectShape] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'rectangle' | 'circle' | 'text'>('select');
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [newShapeDef, setNewShapeDef] = useState<CardElement | null>(null);

  const stageARef = useRef(null);
  const stageBRef = useRef(null);
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const transformerRef = useRef(null);

  const handleSave = () => {
    const updatedCard: Card = {
      id: card?.id || Date.now().toString(),
      deckId: card?.deckId || '',
      elements: [...sideAElements, ...sideBElements],
    };
    onSave(updatedCard);
  };

  const handleMouseDown = (side: 'A' | 'B', e: any) => {
    const stage = e.target.getStage();
    const clickedOnEmpty = e.target === stage;
    
    if (clickedOnEmpty) {
      selectShape(null);
      if (tool !== 'select') {
        setIsDrawing(true);
        const pos = stage.getPointerPosition();
        setNewShapeDef({
          id: `${side}${Date.now()}`,
          type: tool,
          side,
          position: { x: pos.x, y: pos.y, width: 0, height: 0 },
          style: { fill: color, stroke: color, strokeWidth: 2 },
          content: tool === 'text' ? 'New Text' : '',
        });
      }
    } else {
      const clickedOnTransformer = e.target.getParent().className === 'Transformer';
      if (!clickedOnTransformer) {
        const id = e.target.id();
        selectShape(id);
      }
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (isDrawing && newShapeDef) {
      const stage = e.target.getStage();
      const pos = stage.getPointerPosition();
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

  const handleMouseUp = (side: 'A' | 'B') => {
    if (isDrawing && newShapeDef) {
      const setElements = side === 'A' ? setSideAElements : setSideBElements;
      setElements(prevElements => [...prevElements, newShapeDef]);
      setIsDrawing(false);
      setNewShapeDef(null);
    }
    setIsDragging(false);
  };

  return (
    <EditorContainer>
      <h2>Edit Card</h2>
      <EditArea>
        <CardEditorToolbar tool={tool} setTool={setTool} color={color} setColor={setColor} />
        <SideBySideContainer>
          <CardEditorStage
            side="A"
            elements={sideAElements}
            stageRef={stageARef}
            layerRef={layerARef}
            transformerRef={transformerRef}
            selectedId={selectedId}
            selectShape={selectShape}
            isDrawing={isDrawing}
            isDragging={isDragging}
            setIsDrawing={setIsDrawing}
            newShapeDef={newShapeDef}
            setNewShapeDef={setNewShapeDef}
            tool={tool}
            color={color}
            onMouseDown={(e) => handleMouseDown('A', e)}
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp('A')}
          />
          <CardEditorStage
            side="B"
            elements={sideBElements}
            stageRef={stageBRef}
            layerRef={layerBRef}
            transformerRef={transformerRef}
            selectedId={selectedId}
            selectShape={selectShape}
            isDrawing={isDrawing}
            isDragging={isDragging}
            setIsDrawing={setIsDrawing}
            newShapeDef={newShapeDef}
            setNewShapeDef={setNewShapeDef}
            tool={tool}
            color={color}
            onMouseDown={(e) => handleMouseDown('B', e)}
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp('B')}
          />
        </SideBySideContainer>
        <SaveButton onClick={handleSave}>Save Card</SaveButton>
      </EditArea>
    </EditorContainer>
  );
};

export default CardEditor;
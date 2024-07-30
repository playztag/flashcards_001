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
            setIsDrawing={setIsDrawing}
            newShapeDef={newShapeDef}
            setNewShapeDef={setNewShapeDef}
            tool={tool}
            color={color}
            onMouseDown={(e) => handleStageMouseDown('A', e, tool, color, setIsDrawing, setNewShapeDef, selectShape)}
            onMouseMove={(e) => handleStageMouseMove(e, isDrawing, newShapeDef, setNewShapeDef)}
            onMouseUp={() => handleStageMouseUp(isDrawing, newShapeDef, setIsDrawing, setNewShapeDef, setSideAElements)}
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
            setIsDrawing={setIsDrawing}
            newShapeDef={newShapeDef}
            setNewShapeDef={setNewShapeDef}
            tool={tool}
            color={color}
            onMouseDown={(e) => handleStageMouseDown('B', e, tool, color, setIsDrawing, setNewShapeDef, selectShape)}
            onMouseMove={(e) => handleStageMouseMove(e, isDrawing, newShapeDef, setNewShapeDef)}
            onMouseUp={() => handleStageMouseUp(isDrawing, newShapeDef, setIsDrawing, setNewShapeDef, setSideBElements)}
          />
        </SideBySideContainer>
        <SaveButton onClick={handleSave}>Save Card</SaveButton>
      </EditArea>
    </EditorContainer>
  );
};

export default CardEditor;
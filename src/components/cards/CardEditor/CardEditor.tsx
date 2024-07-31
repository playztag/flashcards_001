import React, { useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { CardEditorToolbar } from './CardEditorToolbar';
import { CardEditorStage } from './CardEditorStage';
import { TransformerHandler } from './TransformerHandler';
import { Card, CardElement } from '../../../types/Card';
import { EditorContainer, EditArea, SideBySideContainer, SaveButton } from './styles';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './utils';

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
  const [tool, setTool] = useState<'select' | 'rectangle' | 'circle' | 'text' | 'line' | 'triangle'>('select');
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShapeDef, setNewShapeDef] = useState<CardElement | null>(null);

  const stageARef = useRef(null);
  const stageBRef = useRef(null);
  const layerARef = useRef(null);
  const layerBRef = useRef(null);

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
            selectedId={selectedId}
            selectShape={selectShape}
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing}
            newShapeDef={newShapeDef}
            setNewShapeDef={setNewShapeDef}
            tool={tool}
            color={color}
            onMouseDown={(e) => handleMouseDown('A', e, tool, color, setIsDrawing, setNewShapeDef, selectShape)}
            onMouseMove={(e) => handleMouseMove(e, isDrawing, newShapeDef, setNewShapeDef)}
            onMouseUp={() => handleMouseUp('A', isDrawing, newShapeDef, setIsDrawing, setNewShapeDef, setSideAElements)}
          >
            <TransformerHandler selectedId={selectedId} layerRef={layerARef} />
          </CardEditorStage>
          <CardEditorStage
            side="B"
            elements={sideBElements}
            stageRef={stageBRef}
            layerRef={layerBRef}
            selectedId={selectedId}
            selectShape={selectShape}
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing}
            newShapeDef={newShapeDef}
            setNewShapeDef={setNewShapeDef}
            tool={tool}
            color={color}
            onMouseDown={(e) => handleMouseDown('B', e, tool, color, setIsDrawing, setNewShapeDef, selectShape)}
            onMouseMove={(e) => handleMouseMove(e, isDrawing, newShapeDef, setNewShapeDef)}
            onMouseUp={() => handleMouseUp('B', isDrawing, newShapeDef, setIsDrawing, setNewShapeDef, setSideBElements)}
          >
            <TransformerHandler selectedId={selectedId} layerRef={layerBRef} />
          </CardEditorStage>
        </SideBySideContainer>
        <SaveButton onClick={handleSave}>Save Card</SaveButton>
      </EditArea>
    </EditorContainer>
  );
};

export default CardEditor;
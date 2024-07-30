import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import { HexColorPicker } from 'react-colorful';
import styled from '@emotion/styled';
import { CardElement, Card } from '../../types/Card';
import Konva from 'konva';

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
  const stageARef = useRef<Konva.Stage>(null);
  const stageBRef = useRef<Konva.Stage>(null);
  const layerARef = useRef<Konva.Layer>(null);
  const layerBRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (selectedId) {
      const stage = selectedId.startsWith('A') ? stageARef.current : stageBRef.current;
      const layer = selectedId.startsWith('A') ? layerARef.current : layerBRef.current;
      const transformer = transformerRef.current;
      
      if (stage && layer && transformer) {
        const selectedNode = stage.findOne('#' + selectedId);
        if (selectedNode) {
          transformer.nodes([selectedNode]);
          layer.add(transformer);
          layer.batchDraw();
        }
      }
    }
  }, [selectedId]);

  const addElement = (element: CardElement) => {
    if (element.side === 'A') {
      setSideAElements(prev => [...prev, element]);
    } else {
      setSideBElements(prev => [...prev, element]);
    }
  };

  const updateElement = (id: string, newProps: Partial<CardElement>) => {
    const updateSide = (elements: CardElement[]) =>
      elements.map(el => el.id === id ? { ...el, ...newProps } : el);

    if (id.startsWith('A')) {
      setSideAElements(updateSide);
    } else {
      setSideBElements(updateSide);
    }
  };

  const handleStageMouseDown = (side: 'A' | 'B', e: Konva.KonvaEventObject<MouseEvent>) => {
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

  const handleStageMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
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

  const handleStageMouseUp = () => {
    if (isDrawing && newShapeDef) {
      addElement(newShapeDef);
      setIsDrawing(false);
      setNewShapeDef(null);
    }
  };

  const renderShape = (element: CardElement) => {
    const shapeProps = {
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
      onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
        updateElement(element.id, {
          position: {
            ...element.position,
            x: e.target.x(),
            y: e.target.y(),
          },
        });
      },
      onTransformEnd: (e: Konva.KonvaEventObject<Event>) => {
        const node = e.target;
        updateElement(element.id, {
          position: {
            ...element.position,
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
          },
        });
      },
    };

    switch (element.type) {
      case 'rectangle':
        return <Rect key={element.id} {...shapeProps} />;
      case 'circle':
        return <Circle key={element.id} {...shapeProps} radius={element.position.width / 2} />;
      case 'text':
        return (
          <Text
            key={element.id}
            {...shapeProps}
            text={element.content}
            fontSize={element.style.fontSize || 16}
            fill={element.style.fill}
          />
        );
      default:
        return null;
    }
  };

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
        <ToolbarContainer>
          <Toolbar>
            <ToolButton onClick={() => setTool('select')} active={tool === 'select'}>Select</ToolButton>
            <ToolButton onClick={() => setTool('rectangle')} active={tool === 'rectangle'}>Rectangle</ToolButton>
            <ToolButton onClick={() => setTool('circle')} active={tool === 'circle'}>Circle</ToolButton>
            <ToolButton onClick={() => setTool('text')} active={tool === 'text'}>Text</ToolButton>
          </Toolbar>
          <ColorPickerContainer>
            <HexColorPicker color={color} onChange={setColor} />
          </ColorPickerContainer>
        </ToolbarContainer>
        <SideBySideContainer>
          <StageContainer>
            <h3>Side A</h3>
            <Stage
              width={400}
              height={300}
              ref={stageARef}
              onMouseDown={(e) => handleStageMouseDown('A', e)}
              onMouseMove={handleStageMouseMove}
              onMouseUp={handleStageMouseUp}
            >
              <Layer ref={layerARef}>
                {sideAElements.map((element) => renderShape(element))}
                {isDrawing && newShapeDef && newShapeDef.side === 'A' && renderShape(newShapeDef)}
                <Transformer ref={transformerRef} />
              </Layer>
            </Stage>
          </StageContainer>
          <StageContainer>
            <h3>Side B</h3>
            <Stage
              width={400}
              height={300}
              ref={stageBRef}
              onMouseDown={(e) => handleStageMouseDown('B', e)}
              onMouseMove={handleStageMouseMove}
              onMouseUp={handleStageMouseUp}
            >
              <Layer ref={layerBRef}>
                {sideBElements.map((element) => renderShape(element))}
                {isDrawing && newShapeDef && newShapeDef.side === 'B' && renderShape(newShapeDef)}
                <Transformer ref={transformerRef} />
              </Layer>
            </Stage>
          </StageContainer>
        </SideBySideContainer>
        <SaveButton onClick={handleSave}>Save Card</SaveButton>
      </EditArea>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const EditArea = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
`;

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
`;

const ToolButton = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#4a90e2' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#333333'};
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#3a7bd5' : '#f0f0f0'};
  }
`;

const ColorPickerContainer = styled.div`
  .react-colorful {
    width: 120px;
    height: 120px;
  }
`;

const SideBySideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StageContainer = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  overflow: hidden;
  width: 48%;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

export default CardEditor;
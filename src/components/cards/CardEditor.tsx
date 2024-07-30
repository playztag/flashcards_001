import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { HexColorPicker } from 'react-colorful';
import styled from '@emotion/styled';
import { CardElement, Card } from '../../types/Card';

interface CardEditorProps {
  card?: Card;
  onSave: (card: Card) => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ card, onSave }) => {
  const [sideAElements, setSideAElements] = useState<CardElement[]>(card?.sideA.elements || []);
  const [sideBElements, setSideBElements] = useState<CardElement[]>(card?.sideB.elements || []);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'rectangle' | 'circle' | 'text'>('select');
  const [color, setColor] = useState("#000000");
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

  const addElement = (side: 'A' | 'B', type: 'rectangle' | 'circle' | 'text') => {
    const newElement: CardElement = {
      id: `${side}${Date.now()}`,
      type,
      content: type === 'text' ? 'New Text' : '',
      style: { backgroundColor: color, borderColor: color, borderWidth: 2, fontColor: color },
      position: { x: 50, y: 50, width: 100, height: 100 },
    };
    if (side === 'A') {
      setSideAElements([...sideAElements, newElement]);
    } else {
      setSideBElements([...sideBElements, newElement]);
    }
  };

  const updateElement = (side: 'A' | 'B', id: string, newProps: Partial<CardElement>) => {
    const updateElements = (elements: CardElement[]) =>
      elements.map(el => el.id === id ? { ...el, ...newProps } : el);
    
    if (side === 'A') {
      setSideAElements(updateElements(sideAElements));
    } else {
      setSideBElements(updateElements(sideBElements));
    }
  };

  const handleStageClick = (side: 'A' | 'B', e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      if (tool !== 'select') {
        addElement(side, tool);
        setTool('select');
      }
    }
  };

  const renderShape = (side: 'A' | 'B', element: CardElement) => {
    const shapeProps = {
      id: element.id,
      x: element.position.x,
      y: element.position.y,
      width: element.position.width,
      height: element.position.height,
      fill: element.style.backgroundColor,
      stroke: element.style.borderColor,
      strokeWidth: element.style.borderWidth,
      draggable: true,
      onClick: () => selectShape(element.id),
      onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
        updateElement(side, element.id, {
          position: {
            ...element.position,
            x: e.target.x(),
            y: e.target.y(),
          },
        });
      },
      onTransformEnd: (e: Konva.KonvaEventObject<Event>) => {
        const node = e.target;
        updateElement(side, element.id, {
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
            fill={element.style.fontColor}
          />
        );
      default:
        return null;
    }
  };

  const handleSave = () => {
    if (card) {
      onSave({
        ...card,
        sideA: { elements: sideAElements },
        sideB: { elements: sideBElements }
      });
    } else {
      onSave({
        id: Date.now().toString(),
        deckId: '',
        sideA: { elements: sideAElements },
        sideB: { elements: sideBElements }
      });
    }
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
        <SidesContainer>
          <SideContainer>
            <h3>Side A</h3>
            <StageContainer>
              <Stage
                width={320}
                height={240}
                ref={stageARef}
                onClick={(e) => handleStageClick('A', e)}
              >
                <Layer ref={layerARef}>
                  {sideAElements.map((element) => renderShape('A', element))}
                  <Transformer ref={transformerRef} />
                </Layer>
              </Stage>
            </StageContainer>
          </SideContainer>
          <SideContainer>
            <h3>Side B</h3>
            <StageContainer>
              <Stage
                width={320}
                height={240}
                ref={stageBRef}
                onClick={(e) => handleStageClick('B', e)}
              >
                <Layer ref={layerBRef}>
                  {sideBElements.map((element) => renderShape('B', element))}
                  <Transformer ref={transformerRef} />
                </Layer>
              </Stage>
            </StageContainer>
          </SideContainer>
        </SidesContainer>
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
  max-width: 800px;
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

const SidesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SideContainer = styled.div`
  width: 48%;

  h3 {
    margin-bottom: 10px;
  }
`;

const StageContainer = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  overflow: hidden;
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

  &:hover {
    background-color: #45a049;
  }
`;

export default CardEditor;
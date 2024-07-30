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
  const [elements, setElements] = useState<CardElement[]>(card?.sideA.elements || []);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'rectangle' | 'circle' | 'text'>('select');
  const [color, setColor] = useState("#000000");
  const [history, setHistory] = useState<CardElement[][]>([]);
  const [historyStep, setHistoryStep] = useState(0);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (selectedId) {
      const stage = stageRef.current;
      const layer = layerRef.current;
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

  const addElement = (type: 'rectangle' | 'circle' | 'text') => {
    const newElement: CardElement = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New Text' : '',
      style: { backgroundColor: color, borderColor: color, borderWidth: 2, fontColor: color },
      position: { x: 50, y: 50, width: 100, height: 100 },
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
  };

  const updateElement = (id: string, newProps: Partial<CardElement>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...newProps } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      if (tool !== 'select') {
        addElement(tool);
        setTool('select');
      }
    }
  };

  const addToHistory = (newElements: CardElement[]) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setElements(history[historyStep - 1]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setElements(history[historyStep + 1]);
    }
  };

  const renderShape = (element: CardElement) => {
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
        sideA: { elements }
      });
    } else {
      onSave({
        id: Date.now().toString(),
        deckId: '',
        sideA: { elements },
        sideB: { elements: [] }
      });
    }
  };

  return (
    <EditorContainer>
      <Toolbar>
        <ToolButton onClick={() => setTool('select')} active={tool === 'select'}>Select</ToolButton>
        <ToolButton onClick={() => setTool('rectangle')} active={tool === 'rectangle'}>Rectangle</ToolButton>
        <ToolButton onClick={() => setTool('circle')} active={tool === 'circle'}>Circle</ToolButton>
        <ToolButton onClick={() => setTool('text')} active={tool === 'text'}>Text</ToolButton>
        <ToolButton onClick={undo} disabled={historyStep === 0}>Undo</ToolButton>
        <ToolButton onClick={redo} disabled={historyStep === history.length - 1}>Redo</ToolButton>
      </Toolbar>
      <ColorPickerContainer>
        <HexColorPicker color={color} onChange={setColor} />
      </ColorPickerContainer>
      <Stage
        width={400}
        height={600}
        ref={stageRef}
        onClick={handleStageClick}
      >
        <Layer ref={layerRef}>
          {elements.map(renderShape)}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      <SaveButton onClick={handleSave}>Save Card</SaveButton>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ToolButton = styled.button<{ active?: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${props => props.active ? '#4a90e2' : '#f0f0f0'};
  color: ${props => props.active ? '#ffffff' : '#000000'};
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.active ? '#3a7bd5' : '#e0e0e0'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ColorPickerContainer = styled.div`
  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default CardEditor;
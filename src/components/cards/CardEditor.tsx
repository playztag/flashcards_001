import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import { Card, CardElement } from '../../types/Card';
import styled from '@emotion/styled';

interface CardEditorProps {
  card?: Card;
  onSave: (card: Card) => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ card, onSave }) => {
  const [sideAElements, setSideAElements] = useState<CardElement[]>(card?.sideA.elements || []);
  const [sideBElements, setSideBElements] = useState<CardElement[]>(card?.sideB.elements || []);
  const [activeSide, setActiveSide] = useState<'A' | 'B'>('A');
  const [selectedTool, setSelectedTool] = useState<'select' | 'rectangle' | 'circle' | 'text'>('select');

  const handleAddShape = (type: 'rectangle' | 'circle') => {
    const newElement: CardElement = {
      id: Date.now().toString(),
      type,
      content: '',
      style: { backgroundColor: '#ffffff', borderColor: '#000000', borderWidth: 2 },
      position: { x: 50, y: 50, width: 100, height: 100 },
    };

    if (activeSide === 'A') {
      setSideAElements([...sideAElements, newElement]);
    } else {
      setSideBElements([...sideBElements, newElement]);
    }
  };

  const handleAddText = () => {
    const newElement: CardElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'New Text',
      style: { fontFamily: 'Arial', fontSize: 16, fontColor: '#000000' },
      position: { x: 50, y: 50, width: 100, height: 20 },
    };

    if (activeSide === 'A') {
      setSideAElements([...sideAElements, newElement]);
    } else {
      setSideBElements([...sideBElements, newElement]);
    }
  };

  const handleSave = () => {
    const updatedCard: Card = {
      id: card?.id || Date.now().toString(),
      deckId: card?.deckId || '',
      sideA: { elements: sideAElements },
      sideB: { elements: sideBElements },
    };
    onSave(updatedCard);
  };

  const handleToolSelect = (tool: 'select' | 'rectangle' | 'circle' | 'text') => {
    setSelectedTool(tool);
    if (tool === 'rectangle' || tool === 'circle') {
      handleAddShape(tool);
    } else if (tool === 'text') {
      handleAddText();
    }
  };

  const renderShape = (element: CardElement) => {
    switch (element.type) {
      case 'rectangle':
        return (
          <Rect
            key={element.id}
            x={element.position.x}
            y={element.position.y}
            width={element.position.width}
            height={element.position.height}
            fill={element.style.backgroundColor}
            stroke={element.style.borderColor}
            strokeWidth={element.style.borderWidth}
          />
        );
      case 'circle':
        return (
          <Circle
            key={element.id}
            x={element.position.x + element.position.width / 2}
            y={element.position.y + element.position.height / 2}
            radius={Math.min(element.position.width, element.position.height) / 2}
            fill={element.style.backgroundColor}
            stroke={element.style.borderColor}
            strokeWidth={element.style.borderWidth}
          />
        );
      case 'text':
        return (
          <Text
            key={element.id}
            x={element.position.x}
            y={element.position.y}
            text={element.content}
            fontSize={element.style.fontSize}
            fontFamily={element.style.fontFamily}
            fill={element.style.fontColor}
          />
        );
    }
  };

  return (
    <EditorContainer>
      <Toolbar>
        <ToolButton onClick={() => handleToolSelect('select')} active={selectedTool === 'select'}>Select</ToolButton>
        <ToolButton onClick={() => handleToolSelect('rectangle')} active={selectedTool === 'rectangle'}>Rectangle</ToolButton>
        <ToolButton onClick={() => handleToolSelect('circle')} active={selectedTool === 'circle'}>Circle</ToolButton>
        <ToolButton onClick={() => handleToolSelect('text')} active={selectedTool === 'text'}>Text</ToolButton>
      </Toolbar>
      <CanvasContainer>
        <SideSelector>
          <SideButton onClick={() => setActiveSide('A')} active={activeSide === 'A'}>Side A</SideButton>
          <SideButton onClick={() => setActiveSide('B')} active={activeSide === 'B'}>Side B</SideButton>
        </SideSelector>
        <Stage width={400} height={600}>
          <Layer>
            {activeSide === 'A'
              ? sideAElements.map(renderShape)
              : sideBElements.map(renderShape)
            }
          </Layer>
        </Stage>
      </CanvasContainer>
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

const ToolButton = styled.button<{ active: boolean }>`
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
`;

const CanvasContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const SideSelector = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 10px;
`;

const SideButton = styled.button<{ active: boolean }>`
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
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { ToolbarContainer, Toolbar, ToolButton, ColorPickerContainer } from './CardEditorStyles';

interface CardEditorToolbarProps {
  tool: 'select' | 'rectangle' | 'circle' | 'text';
  setTool: (tool: 'select' | 'rectangle' | 'circle' | 'text') => void;
  color: string;
  setColor: (color: string) => void;
}

export const CardEditorToolbar: React.FC<CardEditorToolbarProps> = ({ tool, setTool, color, setColor }) => {
  return (
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
  );
};
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { ToolbarContainer, Toolbar, ToolButton, ColorPickerContainer } from './styles';

interface CardEditorToolbarProps {
  tool: 'select' | 'rectangle' | 'circle' | 'text' | 'line' | 'triangle';
  setTool: (tool: 'select' | 'rectangle' | 'circle' | 'text' | 'line' | 'triangle') => void;
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
        <ToolButton onClick={() => setTool('line')} active={tool === 'line'}>Line</ToolButton>
        <ToolButton onClick={() => setTool('triangle')} active={tool === 'triangle'}>Triangle</ToolButton>
      </Toolbar>
      <ColorPickerContainer>
        <HexColorPicker color={color} onChange={setColor} />
      </ColorPickerContainer>
    </ToolbarContainer>
  );
};
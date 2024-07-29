import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideEditor from '../SideEditor';
import { CardElement } from '../../../types/Card';

describe('SideEditor Component', () => {
  const renderSideEditor = (content: CardElement[], setContent: any, undo: any, redo: any) =>
    render(
      <SideEditor
        side="A"
        content={content}
        setContent={setContent}
        undo={undo}
        redo={redo}
      />
    );

  it('should add, undo, and redo elements correctly', () => {
    let content: CardElement[] = [];
    const setContent = jest.fn((newContent) => (content = newContent));
    const undo = jest.fn();
    const redo = jest.fn();

    renderSideEditor(content, setContent, undo, redo);

    act(() => {
      // Add text element
      fireEvent.click(screen.getByText('Add Text'));
    });
    expect(setContent).toHaveBeenCalled();
    expect(content).toHaveLength(1);

    // Undo action
    act(() => {
      fireEvent.click(screen.getByText('Undo'));
    });
    expect(undo).toHaveBeenCalled();

    // Redo action
    act(() => {
      fireEvent.click(screen.getByText('Redo'));
    });
    expect(redo).toHaveBeenCalled();
  });
});

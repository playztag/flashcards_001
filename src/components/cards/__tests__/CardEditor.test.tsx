import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CardEditor from '../CardEditor';

describe('CardEditor Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<Router>{ui}</Router>);
  };

  it('should add elements and handle undo/redo correctly', () => {
    renderWithRouter(<CardEditor />);

    // Assuming there are buttons to add text content and undo/redo
    const addTextButton = screen.getByText('Add Text');
    fireEvent.click(addTextButton);

    // Simulate setting text content
    const textArea = screen.getByPlaceholderText('Enter text');
    fireEvent.change(textArea, { target: { value: 'Side A Content' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Verify the content is added
    expect(screen.getByDisplayValue('Side A Content')).toBeInTheDocument();

    const undoButton = screen.getByText('Undo');
    fireEvent.click(undoButton);

    // Verify the content is removed
    expect(screen.queryByDisplayValue('Side A Content')).not.toBeInTheDocument();

    const redoButton = screen.getByText('Redo');
    fireEvent.click(redoButton);

    // Verify the content is added back
    expect(screen.getByDisplayValue('Side A Content')).toBeInTheDocument();
  });
});
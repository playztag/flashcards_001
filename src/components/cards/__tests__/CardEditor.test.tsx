import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CardEditor from '../CardEditor';
import { saveCards } from '../../../services/storage';

jest.mock('../../../services/storage', () => ({
  getCards: jest.fn(() => []),
  saveCards: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('CardEditor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ... other tests ...

  it('should handle undo and redo operations', async () => {
    render(
      <Router>
        <CardEditor />
      </Router>
    );

    // Add content to Side A
    const addTextButtonsA = screen.getAllByText('Add Text');
    fireEvent.click(addTextButtonsA[0]);
    const textAreasA = screen.getAllByPlaceholderText('Enter text');
    fireEvent.change(textAreasA[0], { target: { value: 'Side A Content' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Side A Content')).toBeInTheDocument();
    });

    // Undo
    const undoButtons = screen.getAllByText('Undo');
    fireEvent.click(undoButtons[0]);

    await waitFor(() => {
      expect(screen.queryByDisplayValue('Side A Content')).not.toBeInTheDocument();
    });

    // Redo
    const redoButtons = screen.getAllByText('Redo');
    fireEvent.click(redoButtons[0]);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Side A Content')).toBeInTheDocument();
    });
  });
});
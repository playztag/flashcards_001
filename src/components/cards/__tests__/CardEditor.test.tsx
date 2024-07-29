import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CardEditor from '../CardEditor';
import * as storage from '../../../services/storage';

// Mock the storage module
jest.mock('../../../services/storage', () => ({
  getCards: jest.fn(() => []),
  saveCards: jest.fn(),
}));

// Utility function to render with Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<Router>{ui}</Router>);
};

describe('CardEditor', () => {
  it('renders CardEditor and saves a card', () => {
    renderWithRouter(<CardEditor />);
    const addTextButtonA = screen.getAllByText('Add Text')[0];
    const addTextButtonB = screen.getAllByText('Add Text')[1];

    // Add text to Side A
    fireEvent.click(addTextButtonA);
    const textareaA = screen.getAllByPlaceholderText('Enter text')[0];
    fireEvent.change(textareaA, { target: { value: 'Side A Content' } });

    // Add text to Side B
    fireEvent.click(addTextButtonB);
    const textareaB = screen.getAllByPlaceholderText('Enter text')[1];
    fireEvent.change(textareaB, { target: { value: 'Side B Content' } });

    // Save the card
    const saveButton = screen.getByText('Save Card');
    fireEvent.click(saveButton);

    // Assert saveCards was called
    expect(storage.saveCards).toHaveBeenCalled();
    expect(storage.saveCards).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          sideA: expect.objectContaining({
            elements: expect.arrayContaining([
              expect.objectContaining({ content: 'Side A Content' })
            ])
          }),
          sideB: expect.objectContaining({
            elements: expect.arrayContaining([
              expect.objectContaining({ content: 'Side B Content' })
            ])
          })
        })
      ])
    );
  });

  it('displays error when trying to save an empty card', () => {
    renderWithRouter(<CardEditor />);
    const saveButton = screen.getByText('Save Card');
    fireEvent.click(saveButton);
    expect(window.alert).toHaveBeenCalledWith('Both sides of the card must have content');
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardEditor from '../CardEditor';
import * as storage from '../../../services/storage';
import { BrowserRouter } from 'react-router-dom';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock storage
jest.mock('../../../services/storage', () => ({
  getCards: jest.fn(() => []),
  saveCards: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CardEditor', () => {
  it('renders input fields for both sides of the card', () => {
    renderWithRouter(<CardEditor />);
    expect(screen.getByPlaceholderText('Enter content for Side A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter content for Side B')).toBeInTheDocument();
  });

  it('calls onSave with the correct card data when save button is clicked', () => {
    const mockSave = jest.fn();
    renderWithRouter(<CardEditor onSave={mockSave} />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter content for Side A'), { target: { value: 'Side A Content' } });
    fireEvent.change(screen.getByPlaceholderText('Enter content for Side B'), { target: { value: 'Side B Content' } });
    
    fireEvent.click(screen.getByText('Save Card'));
    
    expect(storage.saveCards).toHaveBeenCalled();
    expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
      sideA: expect.objectContaining({
        elements: [expect.objectContaining({ content: 'Side A Content' })]
      }),
      sideB: expect.objectContaining({
        elements: [expect.objectContaining({ content: 'Side B Content' })]
      })
    }));
  });
});
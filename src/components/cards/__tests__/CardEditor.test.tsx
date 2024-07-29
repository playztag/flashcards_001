import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardEditor from '../CardEditor';

describe('CardEditor', () => {
  it('renders input fields for both sides of the card', () => {
    render(<CardEditor cardId={null} onSave={() => {}} />);
    expect(screen.getByPlaceholderText('Enter content for Side A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter content for Side B')).toBeInTheDocument();
  });

  it('calls onSave with the correct card data when save button is clicked', () => {
    const mockSave = jest.fn();
    render(<CardEditor cardId={null} onSave={mockSave} />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter content for Side A'), { target: { value: 'Side A Content' } });
    fireEvent.change(screen.getByPlaceholderText('Enter content for Side B'), { target: { value: 'Side B Content' } });
    
    fireEvent.click(screen.getByText('Save Card'));
    
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

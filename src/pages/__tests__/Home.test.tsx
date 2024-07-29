import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home';
import * as storage from '../../services/storage';

jest.mock('../../services/storage');

describe('Home component', () => {
  it('renders the title', () => {
    (storage.getCards as jest.Mock).mockReturnValue([]);
    render(<Router><Home /></Router>);
    expect(screen.getByText('Your Flash Cards')).toBeInTheDocument();
  });

  it('displays existing cards', () => {
    const mockCards = [
      {
        id: '1',
        deckId: '',
        sideA: { elements: [{ id: '1', type: 'text', content: 'Question 1', style: {}, position: { x: 0, y: 0, width: 100, height: 100 } }] },
        sideB: { elements: [{ id: '2', type: 'text', content: 'Answer 1', style: {}, position: { x: 0, y: 0, width: 100, height: 100 } }] }
      }
    ];
    (storage.getCards as jest.Mock).mockReturnValue(mockCards);

    render(<Router><Home /></Router>);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
  });
});

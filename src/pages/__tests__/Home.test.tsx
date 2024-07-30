import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home';
import * as storage from '../../services/storage';

jest.mock('../../services/storage');

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title', async () => {
    (storage.getCards as jest.Mock).mockResolvedValue([]);
    render(<Router><Home /></Router>);
    await waitFor(() => {
      expect(screen.getByText('Your Flash Cards')).toBeInTheDocument();
    });
  });

  it('displays loading state', async () => {
    (storage.getCards as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve([]), 100)));
    render(<Router><Home /></Router>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    (storage.getCards as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    render(<Router><Home /></Router>);
    await waitFor(() => {
      expect(screen.getByText('Failed to load cards. Please try again later.')).toBeInTheDocument();
    });
  });

  it('displays existing cards', async () => {
    const mockCards = [
      {
        id: '1',
        deckId: '',
        sideA: { elements: [{ id: '1', type: 'text', content: 'Question 1', style: {}, position: { x: 0, y: 0, width: 100, height: 100 } }] },
        sideB: { elements: [{ id: '2', type: 'text', content: 'Answer 1', style: {}, position: { x: 0, y: 0, width: 100, height: 100 } }] }
      }
    ];
    (storage.getCards as jest.Mock).mockResolvedValue(mockCards);

    render(<Router><Home /></Router>);
    
    await waitFor(() => {
      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
  });
});
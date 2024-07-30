import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeckManager from '../../../components/decks/DeckManager';
import * as storage from '../../../services/storage';

jest.mock('../../../services/storage');

describe('DeckManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the deck manager', () => {
    render(<DeckManager />);
    expect(screen.getByText('Deck Manager')).toBeInTheDocument();
  });

  it('creates a new deck', () => {
    const mockSaveDecks = jest.spyOn(storage, 'saveDecks');
    render(<DeckManager />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter deck name'), { target: { value: 'New Deck' } });
    fireEvent.change(screen.getByPlaceholderText('Enter deck description'), { target: { value: 'Description' } });
    fireEvent.click(screen.getByText('Create New Deck'));

    expect(mockSaveDecks).toHaveBeenCalled();
    expect(screen.getByText('New Deck')).toBeInTheDocument();
  });
});

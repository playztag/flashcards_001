// src/hooks/useDeck.ts

import { useState, useEffect, useCallback } from 'react';
import { Deck } from '../types/Deck';
import { getDecks, saveDeck, deleteDeck, getCardsForDeck } from '../services/storage';

const useDeck = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  useEffect(() => {
    const loadDecks = () => {
      const loadedDecks = getDecks();
      setDecks(loadedDecks);
    };
    loadDecks();
  }, []);

  const createDeck = useCallback((newDeck: Deck) => {
    saveDeck(newDeck);
    setDecks(prevDecks => [...prevDecks, newDeck]);
  }, []);

  const updateDeck = useCallback((updatedDeck: Deck) => {
    saveDeck(updatedDeck);
    setDecks(prevDecks => prevDecks.map(deck => deck.id === updatedDeck.id ? updatedDeck : deck));
  }, []);

  const removeDeck = useCallback((deckId: string) => {
    deleteDeck(deckId);
    setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
  }, []);

  const selectDeck = useCallback((deckId: string) => {
    const deck = decks.find(d => d.id === deckId) || null;
    setSelectedDeck(deck);
  }, [decks]);

  const getCardsForSelectedDeck = useCallback(() => {
    if (selectedDeck) {
      return getCardsForDeck(selectedDeck.id);
    }
    return [];
  }, [selectedDeck]);

  return {
    decks,
    selectedDeck,
    createDeck,
    updateDeck,
    removeDeck,
    selectDeck,
    getCardsForSelectedDeck,
  };
};

export default useDeck;
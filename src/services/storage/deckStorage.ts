import { Deck } from '../../types/Deck';

const DECKS_KEY = 'flashcards_decks';

export const saveDecks = (decks: Deck[]): void => {
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};

export const getDecks = (): Deck[] => {
  const decks = localStorage.getItem(DECKS_KEY);
  return decks ? JSON.parse(decks) : [];
};

export const saveDeck = (deck: Deck): void => {
  const decks = getDecks();
  const index = decks.findIndex(d => d.id === deck.id);
  if (index !== -1) {
    decks[index] = deck;
  } else {
    decks.push(deck);
  }
  saveDecks(decks);
};

export const getDeck = (deckId: string): Deck | undefined => {
  const decks = getDecks();
  return decks.find(deck => deck.id === deckId);
};

export const deleteDeck = (deckId: string): void => {
  const decks = getDecks();
  const updatedDecks = decks.filter(deck => deck.id !== deckId);
  saveDecks(updatedDecks);
};
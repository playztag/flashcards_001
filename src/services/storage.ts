import { Card } from '../types/Card';
import { Deck } from '../types/Deck';

const CARDS_KEY = 'flashcards_cards';
const DECKS_KEY = 'flashcards_decks';

export const saveCards = (cards: Card[]): void => {
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
};

export const getCards = (): Card[] => {
  const cards = localStorage.getItem(CARDS_KEY);
  return cards ? JSON.parse(cards) : [];
};

export const saveDecks = (decks: Deck[]): void => {
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};

export const getDecks = (): Deck[] => {
  const decks = localStorage.getItem(DECKS_KEY);
  return decks ? JSON.parse(decks) : [];
};

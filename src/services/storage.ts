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

export const saveCard = (card: Card): void => {
  const cards = getCards();
  const index = cards.findIndex(c => c.id === card.id);
  if (index !== -1) {
    cards[index] = card;
  } else {
    cards.push(card);
  }
  saveCards(cards);
};

export const getCard = (cardId: string): Card | undefined => {
  const cards = getCards();
  return cards.find(card => card.id === cardId);
};

export const saveDecks = (decks: Deck[]): void => {
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};

export const getDecks = (): Deck[] => {
  const decks = localStorage.getItem(DECKS_KEY);
  return decks ? JSON.parse(decks) : [];
};
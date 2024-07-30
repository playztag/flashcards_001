import { Card } from '../../types/Card';

const CARDS_KEY = 'flashcards_cards';

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

export const deleteCard = (cardId: string): void => {
  const cards = getCards();
  const updatedCards = cards.filter(card => card.id !== cardId);
  saveCards(updatedCards);
};

export const getCardsForDeck = (deckId: string): Card[] => {
  const cards = getCards();
  return cards.filter(card => card.deckId === deckId);
};
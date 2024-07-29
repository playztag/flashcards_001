import { Card } from './Card';

export interface Deck {
  id: string;
  name: string;
  description: string;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
}

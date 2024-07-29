# Deck

## Purpose
Defines the structure of a deck, which is a collection of flash cards.

## Properties
- id: string
- name: string
- description: string
- cards: Card[]
- createdAt: Date
- updatedAt: Date

## Methods
- addCard(card: Card): void
- removeCard(cardId: string): void
- updateCard(cardId: string, updatedCard: Card): void
- exportToJSON(): string
- importFromJSON(json: string): void

## TODO
- [ ] Implement the Deck type
- [ ] Create CRUD methods for managing cards in the deck
- [ ] Implement the exportToJSON method
- [ ] Implement the importFromJSON method
- [ ] Add validation for Deck properties
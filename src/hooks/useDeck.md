# useDeck

## Purpose
The useDeck hook manages deck-related operations and state, providing an interface for components to interact with deck data.

## Dependencies
- react
- ../services/storage
- ../types/Deck
- ../types/Card

## Functionality
1. Fetch and manage deck data
2. Provide CRUD operations for decks
3. Handle card management within decks
4. Manage deck selection state

## Hook Structure
```typescript
const useDeck = () => {
  // Deck state management
  // CRUD operations
  // Card management functions

  return {
    decks,
    selectedDeck,
    createDeck,
    updateDeck,
    deleteDeck,
    selectDeck,
    addCardToDeck,
    removeCardFromDeck,
    reorderCardsInDeck,
  };
};
```

## TODO
- [ ] Implement deck state management
- [ ] Create CRUD operations for decks
- [ ] Add card management functions
- [ ] Integrate with storage service
- [ ] Write unit tests
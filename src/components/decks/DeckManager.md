# DeckManager

## Purpose
The DeckManager component provides an interface for creating, viewing, updating, and deleting decks of flash cards. It also allows users to manage cards within each deck and export decks to JSON.

## Dependencies
- react
- @material-ui/core
- react-beautiful-dnd
- ../../hooks/useDeck
- ../../services/storage
- ../cards/CardList
- ../../types/Deck

## Props
None (manages its own state)

## Main Functionality
1. Display a list of all decks
2. Allow creation of new decks
3. Enable editing of deck names and descriptions
4. Provide functionality to delete decks
5. Display cards within a selected deck
6. Allow reordering of cards within a deck
7. Provide options to add or remove cards from a deck
8. Allow exporting decks to JSON

## Component Structure
```typescript
const DeckManager: React.FC = () => {
  // State management
  // CRUD operations for decks
  // Card management within decks
  // JSON export functionality

  return (
    <div className="deck-manager">
      {/* Deck list */}
      {/* New deck button */}
      {/* Selected deck details */}
      {/* Card list for selected deck */}
      {/* Export to JSON button */}
    </div>
  );
};
```

## Key Functions
- createDeck(name: string, description?: string): void
- updateDeck(id: string, name: string, description?: string): void
- deleteDeck(id: string): void
- selectDeck(id: string): void
- addCardToDeck(deckId: string, cardId: string): void
- removeCardFromDeck(deckId: string, cardId: string): void
- reorderCardsInDeck(deckId: string, startIndex: number, endIndex: number): void
- exportDeckToJSON(deckId: string): void

## State Management
- Use local state for UI-specific properties (selected deck, edit mode)
- Use useDeck hook for deck-related operations and state

## TODO
- [ ] Implement deck list display
- [ ] Create new deck functionality
- [ ] Add deck editing and deletion features
- [ ] Implement deck selection
- [ ] Create card list display for selected deck
- [ ] Add drag-and-drop reordering for cards
- [ ] Implement add/remove card functionality
- [ ] Add JSON export functionality
- [ ] Write unit tests for CRUD operations
- [ ] Integrate with storage service for persistence
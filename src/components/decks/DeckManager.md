# DeckManager

## Purpose
The DeckManager component provides an interface for creating, viewing, updating, and deleting decks of flash cards. It also allows users to manage cards within each deck and export decks to JSON.

## Dependencies
- react
- @emotion/styled
- react-beautiful-dnd
- ../../hooks/useDeck
- ../../services/storage
- ../cards/CardList
- ../../types/Deck

## Main Functionality
1. Display a list of all decks
2. Allow creation of new decks
3. Enable editing of deck names and descriptions
4. Provide functionality to delete decks
5. Display cards within a selected deck
6. Allow reordering of cards within a deck
7. Provide options to add or remove cards from a deck
8. Allow exporting decks to JSON

## TODO
- [x] Implement basic structure
- [x] Create new deck functionality
- [ ] Implement deck list display
- [ ] Add deck editing and deletion features
- [ ] Implement deck selection
- [ ] Create card list display for selected deck
- [ ] Add drag-and-drop reordering for cards
- [ ] Implement add/remove card functionality
- [ ] Add JSON export functionality
- [ ] Write unit tests for CRUD operations
- [ ] Integrate with storage service for persistence
- [ ] Style component using Emotion
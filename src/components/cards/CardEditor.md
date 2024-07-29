# CardEditor

## Purpose
The CardEditor component is the core interface for creating and editing flash cards. It provides a canvas-based environment where users can add shapes, text, and manipulate elements to design both sides of a flash card.

## Dependencies
- react
- react-konva
- @emotion/styled
- ../../hooks/useCanvas
- ../../context/AppStateContext
- ../../types/Card

## Props
- cardId: string | null (null for new card creation)
- onSave: (card: Card) => void

## Main Functionality
1. Provide a canvas for drawing and manipulating shapes and text
2. Display Side A and Side B of the card side by side
3. Offer tools for adding rectangles, circles, and text elements
4. Enable selection, movement, resizing, and deletion of elements
5. Provide color selection for shapes and text
6. Implement undo/redo functionality for edit actions
7. Save card data to local storage and trigger onSave prop

## TODO
- [x] Implement basic structure
- [x] Add text input for both sides
- [ ] Implement canvas setup with react-konva
- [ ] Create toolbar with shape and text tools
- [ ] Implement shape and text addition functionality
- [ ] Add selection and manipulation capabilities
- [ ] Create save functionality
- [ ] Add undo/redo feature
- [ ] Implement color picking for elements
- [ ] Write unit tests for core functions
- [ ] Style component using Emotion
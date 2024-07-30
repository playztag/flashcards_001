# CardEditor

## Purpose
The CardEditor component is the core interface for creating and editing flash cards. It provides a canvas-based environment where users can add shapes, text, and manipulate elements to design both sides of a flash card simultaneously.

## Dependencies
- react
- react-konva
- @emotion/styled
- react-colorful
- ../../types/Card

## Props
- card?: Card (optional, for editing an existing card)
- onSave: (card: Card) => void

## Main Functionality
1. Display Side A and Side B of the card side by side for simultaneous editing
2. Provide a canvas for drawing and manipulating shapes and text on each side
3. Offer tools for adding rectangles, circles, and text elements
4. Enable selection, movement, resizing, and deletion of elements
5. Provide color selection for shapes and text
6. Allow focusing on one side at a time for detailed editing
7. Save card data for both sides

## TODO
- [x] Implement basic structure
- [x] Add simultaneous display of Side A and Side B
- [x] Implement canvas setup with react-konva for both sides
- [x] Create toolbar with shape and text tools
- [x] Implement shape and text addition functionality
- [x] Add selection and manipulation capabilities
- [x] Create save functionality for both sides
- [ ] Add undo/redo feature
- [x] Implement color picking for elements
- [ ] Write unit tests for core functions
- [x] Style component using Emotion
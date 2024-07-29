# useCanvas

## Purpose
The useCanvas hook manages the state and operations for the canvas used in the CardEditor component.

## Dependencies
- react
- konva
- ../types/Shape

## Functionality
1. Manage canvas state (shapes, selected shape, etc.)
2. Provide functions for adding, modifying, and deleting shapes
3. Handle shape selection and deselection
4. Manage undo/redo functionality

## Hook Structure
```typescript
const useCanvas = (initialShapes: Shape[] = []) => {
  // State management
  // Shape manipulation functions
  // Undo/redo logic

  return {
    shapes,
    selectedShape,
    addShape,
    updateShape,
    deleteShape,
    selectShape,
    undo,
    redo,
  };
};
```

## TODO
- [ ] Implement shape state management
- [ ] Create shape manipulation functions
- [ ] Add selection logic
- [ ] Implement undo/redo functionality
- [ ] Write unit tests
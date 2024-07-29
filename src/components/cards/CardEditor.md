# CardEditor

## Purpose
The CardEditor component is the core interface for creating and editing flash cards. It provides a canvas-based environment where users can add shapes, text, and manipulate elements to design both sides of a flash card.

## Dependencies
- react
- react-konva
- @material-ui/core
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

## Component Structure
```typescript
const CardEditor: React.FC<CardEditorProps> = ({ cardId, onSave }) => {
  // State management
  // Canvas setup
  // Tool selection
  // Element manipulation functions
  // Save functionality

  return (
    <div className="card-editor">
      {/* Toolbar */}
      {/* Side A Canvas */}
      {/* Side B Canvas */}
      {/* Color picker */}
      {/* Save button */}
    </div>
  );
};
```

## Key Functions
- addShape(side: 'A' | 'B', type: ShapeType): void
- addText(side: 'A' | 'B'): void
- selectElement(side: 'A' | 'B', id: string): void
- moveElement(side: 'A' | 'B', id: string, x: number, y: number): void
- resizeElement(side: 'A' | 'B', id: string, width: number, height: number): void
- deleteElement(side: 'A' | 'B', id: string): void
- saveCard(): void

## State Management
- Use local state for transient properties (selected element, current tool)
- Use AppStateContext for sharing card data across components

## TODO
- [ ] Implement basic canvas setup with react-konva
- [ ] Create toolbar with shape and text tools
- [ ] Implement shape and text addition functionality
- [ ] Add selection and manipulation capabilities
- [ ] Create save functionality
- [ ] Add undo/redo feature
- [ ] Implement color picking for elements
- [ ] Write unit tests for core functions
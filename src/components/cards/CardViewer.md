# CardViewer

## Purpose
The CardViewer component displays a single flash card, allowing users to flip between Side A and Side B. It's used in both study mode and deck management.

## Dependencies
- react
- @material-ui/core
- ../../types/Card
- ../../hooks/useCard

## Props
- cardId: string
- onFlip?: () => void

## Main Functionality
1. Display the current side of the card (A or B)
2. Provide a mechanism to flip the card
3. Render shapes and text as defined in the card data
4. Optionally trigger onFlip callback when the card is flipped

## Component Structure
```typescript
const CardViewer: React.FC<CardViewerProps> = ({ cardId, onFlip }) => {
  // State for current side
  // Card data fetching logic

  return (
    <div className="card-viewer">
      {/* Card content rendering */}
      {/* Flip button */}
    </div>
  );
};
```

## TODO
- [ ] Implement card data fetching
- [ ] Create rendering logic for shapes and text
- [ ] Add flip functionality
- [ ] Implement smooth flip animation
- [ ] Write unit tests